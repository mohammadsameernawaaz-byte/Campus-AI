import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, FileText, HelpCircle, Layers, BookMarked, X, ArrowRight } from 'lucide-react';

export const GlobalSearchModal = () => {
  const { isGlobalSearchOpen, setIsGlobalSearchOpen, documents, setActiveStudyDrawerDoc, navigate } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isGlobalSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isGlobalSearchOpen]);

  if (!isGlobalSearchOpen) return null;

  // Filter documents, summaries, and questions based on query
  const searchResults = [];

  if (query.trim().length > 1) {
    const q = query.toLowerCase();

    documents.forEach(doc => {
      // Check document title or subject
      if (doc.name.toLowerCase().includes(q) || doc.subject.toLowerCase().includes(q) || doc.unit.toLowerCase().includes(q)) {
        searchResults.push({
          type: 'Document',
          title: doc.name,
          subtitle: `${doc.subject} • ${doc.unit}`,
          doc: doc,
          action: () => {
            setActiveStudyDrawerDoc(doc);
            setIsGlobalSearchOpen(false);
          }
        });
      }

      // Check definitions
      doc.summary.keyDefinitions?.forEach(def => {
        if (def.term.toLowerCase().includes(q) || def.definition.toLowerCase().includes(q)) {
          searchResults.push({
            type: 'Key Definition',
            title: def.term,
            subtitle: `${def.definition.slice(0, 80)}... (${doc.name})`,
            doc: doc,
            action: () => {
              setActiveStudyDrawerDoc(doc);
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });

      // Check questions
      doc.questions?.forEach(quest => {
        if (quest.question.toLowerCase().includes(q) || quest.answer.toLowerCase().includes(q)) {
          searchResults.push({
            type: `${quest.type} Question`,
            title: quest.question,
            subtitle: `${quest.answer.slice(0, 80)}... (${doc.name})`,
            doc: doc,
            action: () => {
              navigate('/dashboard/questions');
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });

      // Check flashcards
      doc.flashcards?.forEach(fc => {
        if (fc.front.toLowerCase().includes(q) || fc.back.toLowerCase().includes(q)) {
          searchResults.push({
            type: 'Flashcard',
            title: fc.front,
            subtitle: `${fc.back.slice(0, 80)}... (${doc.name})`,
            doc: doc,
            action: () => {
              navigate('/dashboard/flashcards');
              setIsGlobalSearchOpen(false);
            }
          });
        }
      });
    });
  }

  const getTypeIcon = (type) => {
    if (type === 'Document') return <FileText size={16} aria-hidden="true" />;
    if (type.includes('Question')) return <HelpCircle size={16} aria-hidden="true" />;
    if (type === 'Flashcard') return <Layers size={16} aria-hidden="true" />;
    return <BookMarked size={16} aria-hidden="true" />;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Search"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(21, 21, 21, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '5rem 1rem 2rem'
      }}
      onClick={() => setIsGlobalSearchOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: 'var(--bg-surface)',
          border: '2px solid var(--ink-primary)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface)'
        }}>
          <Search size={20} style={{ color: 'var(--ink-secondary)', flexShrink: 0 }} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search uploaded notes, summaries, formulas, or questions..."
            style={{
              flex: 1,
              border: 'none',
              fontSize: '1rem',
              padding: 0,
              backgroundColor: 'transparent',
              outline: 'none',
              boxShadow: 'none'
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge" style={{ fontSize: '0.7rem' }}>ESC</span>
            <button
              onClick={() => setIsGlobalSearchOpen(false)}
              style={{ color: 'var(--ink-secondary)', padding: '0.25rem' }}
              aria-label="Close search"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '0.75rem' }}>
          {query.trim().length <= 1 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--ink-muted)' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Type at least 2 characters to search across course notes, formula sheets, and questions.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {['AVL Tree', 'Dijkstra', 'Deadlock', 'Banker', 'Belady', 'Semaphore'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="badge"
                    style={{ cursor: 'pointer' }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--ink-secondary)' }}>
              <p style={{ fontWeight: 600 }}>No matching materials found for "{query}".</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
                Try searching for a syllabus topic, algorithm name, or course keyword.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}
              </div>
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-btn)',
                    border: '1px solid transparent',
                    backgroundColor: 'var(--bg-surface)',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  className="search-result-item"
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', overflow: 'hidden' }}>
                    <div style={{
                      padding: '0.4rem',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-muted)',
                      color: 'var(--ink-secondary)',
                      marginTop: '2px',
                      flexShrink: 0
                    }}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-teal)' }}>
                          {item.type}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--ink-muted)', flexShrink: 0 }} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div style={{
          padding: '0.65rem 1.25rem',
          backgroundColor: 'var(--bg-muted)',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.75rem',
          color: 'var(--ink-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>Press ESC to exit search</span>
          <span>Tip: Press / anywhere to open search</span>
        </div>
      </div>

      <style>{`
        .search-result-item:hover {
          background-color: var(--bg-muted) !important;
          border-color: var(--border-subtle) !important;
        }
      `}</style>
    </div>
  );
};
