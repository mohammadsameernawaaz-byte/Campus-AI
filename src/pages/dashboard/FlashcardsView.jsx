import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, ArrowLeft, ArrowRight, RotateCw, Shuffle, HelpCircle } from 'lucide-react';

export const FlashcardsView = () => {
  const { documents = [] } = useApp();
  const [selectedDocId, setSelectedDocId] = useState('All');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Aggregate flashcards
  const allCards = [];
  (documents || []).forEach(doc => {
    doc.flashcards?.forEach(fc => {
      allCards.push({
        ...fc,
        docName: doc.name,
        docSubject: doc.subject,
        docId: doc.id
      });
    });
  });

  const [cards, setCards] = useState(allCards);

  useEffect(() => {
    const filtered = selectedDocId === 'All'
      ? allCards
      : allCards.filter(c => c.docId === selectedDocId);
    setCards(filtered);
    setCardIndex(0);
    setIsFlipped(false);
  }, [selectedDocId, documents]);

  // Keyboard Navigation: Space to flip, Left / Right arrows to navigate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'SELECT') {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length, cardIndex]);

  const handleNext = () => {
    if (cards.length === 0) return;
    setIsFlipped(false);
    setCardIndex(prev => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    if (cards.length === 0) return;
    setIsFlipped(false);
    setCardIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCardIndex(0);
    setIsFlipped(false);
  };

  const currentCard = cards[cardIndex];

  if (cards.length === 0) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Active Recall Flashcards</h1>
        <p style={{ marginTop: '0.75rem', color: 'var(--ink-secondary)' }}>
          No flashcards available. Upload course notes or select a different subject.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Active Recall Flashcards Deck
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
            Keyboard-driven rapid memorization: Press Space to flip, Arrow keys to navigate.
          </p>
        </div>

        {/* Deck Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Deck:</span>
          <select
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', maxWidth: '280px' }}
          >
            <option value="All">All Course Materials ({allCards.length} cards)</option>
            {documents.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.flashcards?.length || 0})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Deck Controls Bar */}
      <div className="card" style={{ padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="badge" style={{ fontSize: '0.8rem' }}>
            Card {cardIndex + 1} of {cards.length}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
            Tag: <strong>{currentCard?.tag || "General"}</strong> • Source: {currentCard?.docName}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleShuffle}
            className="btn btn-secondary btn-sm"
            title="Randomize Deck Order"
          >
            <Shuffle size={14} />
            <span>Shuffle</span>
          </button>
        </div>
      </div>

      {/* Main Flashcard Interactive Arena */}
      <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          tabIndex={0}
          role="button"
          aria-label={isFlipped ? "Flip to question side" : "Flip to answer side"}
          style={{
            minHeight: '320px',
            backgroundColor: isFlipped ? 'var(--bg-muted)' : 'var(--bg-surface)',
            border: isFlipped ? '2px solid var(--brand-coral)' : '2px solid var(--ink-primary)',
            borderRadius: 'var(--radius-card)',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
            transition: 'all var(--transition-fast)'
          }}
        >
          {/* Card Top Label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className={`badge ${isFlipped ? 'badge-coral' : 'badge-teal'}`}>
              {isFlipped ? "Answer / Model Explanation" : "Question / Concept Prompt"}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
              Click or Press Space to Flip
            </span>
          </div>

          {/* Card Center Content */}
          <div style={{ padding: '1.5rem 0', textAlign: 'center' }}>
            {isFlipped ? (
              <div style={{
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: 'var(--ink-primary)',
                fontWeight: 600,
                whiteSpace: 'pre-line'
              }}>
                {currentCard?.back}
              </div>
            ) : (
              <div style={{
                fontSize: '1.35rem',
                lineHeight: 1.4,
                color: 'var(--ink-primary)',
                fontWeight: 800
              }}>
                {currentCard?.front}
              </div>
            )}
          </div>

          {/* Card Bottom Hint */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
            <RotateCw size={13} />
            <span>{isFlipped ? "Click to view question" : "Click to check answer"}</span>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <button
            onClick={handlePrev}
            className="btn btn-secondary"
            aria-label="Previous card (Left Arrow)"
          >
            <ArrowLeft size={16} />
            <span>Previous Card</span>
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="btn btn-primary"
          >
            <span>Flip Card</span>
          </button>

          <button
            onClick={handleNext}
            className="btn btn-secondary"
            aria-label="Next card (Right Arrow)"
          >
            <span>Next Card</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
