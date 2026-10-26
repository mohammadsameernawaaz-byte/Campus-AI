import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Check, HelpCircle, Eye, EyeOff, RotateCcw, ThumbsUp, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const VivaView = () => {
  const { documents = [] } = useApp();
  const [selectedDocId, setSelectedDocId] = useState('All');
  const [revealedIds, setRevealedIds] = useState([]);
  const [ratings, setRatings] = useState({}); // { [questionId]: 'got-it' | 'needs-review' }

  // Aggregate viva questions
  const allViva = [];
  (documents || []).forEach(doc => {
    doc.viva?.forEach(v => {
      allViva.push({
        ...v,
        docName: doc.name,
        docSubject: doc.subject,
        docId: doc.id
      });
    });
  });

  const filteredViva = selectedDocId === 'All'
    ? allViva
    : allViva.filter(v => v.docId === selectedDocId);

  const toggleReveal = (id) => {
    setRevealedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const setConfidence = (id, status) => {
    setRatings(prev => ({ ...prev, [id]: status }));
  };

  const gotItCount = Object.values(ratings).filter(r => r === 'got-it').length;
  const needsReviewCount = Object.values(ratings).filter(r => r === 'needs-review').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Oral Viva Voce & Conceptual Lab Simulator
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
            Simulate viva exam prompts, test spoken explanations, and self-rate your readiness.
          </p>
        </div>

        {/* Document Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Material:</span>
          <select
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', maxWidth: '280px' }}
          >
            <option value="All">All Course Materials ({documents.length})</option>
            {documents.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Confidence Scoreboard */}
      <div className="card" style={{ padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', backgroundColor: 'var(--bg-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Mastery Status
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--brand-teal)' }}>
                Mastered (Got It): {gotItCount}
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--brand-coral)' }}>
                Needs Review: {needsReviewCount}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => { setRevealedIds([]); setRatings({}); }}
          className="btn btn-secondary btn-sm"
        >
          <RotateCcw size={14} />
          <span>Reset Ratings</span>
        </button>
      </div>

      {/* Viva Question Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredViva.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--ink-muted)' }}>
            No viva questions available for this selection.
          </div>
        ) : (
          filteredViva.map((v, idx) => {
            const isRevealed = revealedIds.includes(v.id);
            const userRating = ratings[v.id];

            return (
              <div key={v.id} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-teal" style={{ fontSize: '0.75rem' }}>
                      Viva Prompt {idx + 1}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      {v.docName}
                    </span>
                  </div>

                  {/* Confidence Self-Rating Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <button
                      onClick={() => setConfidence(v.id, 'got-it')}
                      style={{
                        padding: '0.35rem 0.65rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-btn)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: userRating === 'got-it' ? 'var(--brand-teal)' : 'var(--bg-surface)',
                        color: userRating === 'got-it' ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <ThumbsUp size={12} />
                      <span>Got It</span>
                    </button>
                    <button
                      onClick={() => setConfidence(v.id, 'needs-review')}
                      style={{
                        padding: '0.35rem 0.65rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-btn)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: userRating === 'needs-review' ? 'var(--brand-coral)' : 'var(--bg-surface)',
                        color: userRating === 'needs-review' ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <AlertCircle size={12} />
                      <span>Needs Review</span>
                    </button>
                  </div>
                </div>

                {/* Examiner Question */}
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                  "{v.question}"
                </h2>

                {/* Answer Reveal Button */}
                <button
                  onClick={() => toggleReveal(v.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginBottom: isRevealed ? '1rem' : '0' }}
                >
                  {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{isRevealed ? "Hide Examiner Answer" : "Reveal Expected Examiner Answer"}</span>
                </button>

                {/* Expandable Examiner Answer */}
                {isRevealed && (
                  <div style={{
                    padding: '1.25rem',
                    backgroundColor: 'var(--bg-muted)',
                    borderRadius: 'var(--radius-btn)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.925rem',
                    color: 'var(--ink-primary)',
                    lineHeight: 1.6
                  }}>
                    <strong style={{ display: 'block', color: 'var(--brand-teal)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.35rem', letterSpacing: '0.04em' }}>
                      Examiner Expected Spoken Response:
                    </strong>
                    {v.expectedAnswer}
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
