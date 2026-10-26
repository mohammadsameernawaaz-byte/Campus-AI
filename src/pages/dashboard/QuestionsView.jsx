import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, ChevronDown, ChevronUp, Copy, CheckCircle2, Filter, Printer, BookOpen } from 'lucide-react';

export const QuestionsView = () => {
  const { documents = [] } = useApp();
  const [selectedDocId, setSelectedDocId] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPattern, setSelectedPattern] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Aggregate questions across documents
  const allQuestions = [];
  (documents || []).forEach(doc => {
    doc.questions?.forEach(q => {
      allQuestions.push({
        ...q,
        docName: doc.name,
        docSubject: doc.subject,
        docId: doc.id,
        docExamPattern: doc.examPattern
      });
    });
  });

  const availablePatterns = ['All', ...new Set(allQuestions.map(q => q.docExamPattern).filter(Boolean))];

  const filteredQuestions = allQuestions.filter(q => {
    const docMatch = selectedDocId === 'All' || q.docId === selectedDocId;
    const typeMatch = selectedType === 'All' || q.type === selectedType;
    const patternMatch = selectedPattern === 'All' || q.docExamPattern === selectedPattern;
    return docMatch && typeMatch && patternMatch;
  });

  const handleCopyAnswer = (q) => {
    const text = `[${q.type}] ${q.question}\n\nModel Answer:\n${q.answer}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            High-Weightage Examination Questions
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
            Extracted and categorized from your course notes and previous university question papers.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="btn btn-secondary btn-sm"
          title="Print Question Sheet"
        >
          <Printer size={15} />
          <span>Print Question Sheet</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
          {/* Document Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Material:</span>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Documents ({documents.length})</option>
              {documents.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Mark Type Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, marginRight: '0.25rem' }}>Weightage:</span>
            {['All', '2-Mark', '5-Mark', '10-Mark'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: selectedType === type ? 700 : 500,
                  borderRadius: 'var(--radius-btn)',
                  backgroundColor: selectedType === type ? 'var(--ink-primary)' : 'var(--bg-muted)',
                  color: selectedType === type ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Exam Pattern Filter */}
          {availablePatterns.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Pattern:</span>
              <select
                value={selectedPattern}
                onChange={(e) => setSelectedPattern(e.target.value)}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', maxWidth: '220px' }}
                aria-label="Filter by University Exam Pattern"
              >
                {availablePatterns.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <span className="badge" style={{ fontSize: '0.78rem' }}>
          Showing {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}
        </span>
      </div>

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredQuestions.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--ink-muted)' }}>
            No questions match your current filter selections.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const isCopied = copiedId === q.id;
            return (
              <div key={q.id} className="card" style={{ padding: '1.5rem', transition: 'all var(--transition-fast)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span className={`badge ${q.type === '10-Mark' ? 'badge-coral' : q.type === '5-Mark' ? 'badge-teal' : ''}`}>
                        {q.type}
                      </span>
                      {q.docExamPattern && (
                        <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                          {q.docExamPattern}
                        </span>
                      )}
                      <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        Source: {q.docName}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink-primary)', lineHeight: 1.4 }}>
                      {q.question}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleCopyAnswer(q)}
                      className="btn btn-secondary btn-sm"
                      title="Copy Question & Model Answer"
                    >
                      {isCopied ? <CheckCircle2 size={14} style={{ color: 'green' }} /> : <Copy size={14} />}
                      <span>{isCopied ? "Copied" : "Copy"}</span>
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="btn btn-primary btn-sm"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? "Hide Answer" : "View Model Answer"}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Expandable Model Answer Key */}
                {isExpanded && (
                  <div style={{
                    marginTop: '1.25rem',
                    padding: '1.25rem',
                    backgroundColor: 'var(--bg-muted)',
                    borderRadius: 'var(--radius-btn)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.925rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-line'
                  }}>
                    <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--brand-teal)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                      Model Answer Breakdown (Marking Scheme Approved):
                    </strong>
                    <div style={{ color: 'var(--ink-primary)' }}>
                      {q.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
