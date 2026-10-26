import React, { useState } from 'react';
import {
  Copy,
  Check,
  RefreshCw,
  BookmarkPlus,
  Layers,
  Award,
  FileText,
  Terminal,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateSuggestedFollowUps } from '../../utils/aiEngine';

export const ChatMessage = ({
  message,
  onRegenerate,
  threadTitle = "",
  onSelectSuggestion
}) => {
  const {
    saveAnswerToSummaries,
    convertAnswerToFlashcards,
    generateQuizFromTopic,
    navigate
  } = useApp();

  const [copiedAnswer, setCopiedAnswer] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [saveSummarySuccess, setSaveSummarySuccess] = useState(false);
  const [flashcardsSuccess, setFlashcardsSuccess] = useState(false);

  const isUser = message.role === 'user';
  const suggestions = message.suggestedFollowUps || (!isUser ? generateSuggestedFollowUps(threadTitle || message.content, message.content) : []);

  const handleCopyAnswer = () => {
    navigator.clipboard.writeText(message.content);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2000);
  };

  const handleCopyCode = (codeText, id) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSaveToSummaries = () => {
    const title = threadTitle || "AI Synthesized Exam Notes";
    saveAnswerToSummaries(title, message.content);
    setSaveSummarySuccess(true);
    setTimeout(() => setSaveSummarySuccess(false), 3000);
  };

  const handleConvertToFlashcards = () => {
    const title = threadTitle || "AI Concept Cards";
    convertAnswerToFlashcards(title, message.content);
    setFlashcardsSuccess(true);
    setTimeout(() => setFlashcardsSuccess(false), 3000);
  };

  const handleGenerateQuiz = () => {
    const topic = threadTitle || "Chat Topic Assessment";
    generateQuizFromTopic(topic, message.content);
  };

  // Helper to format inline markdown (bold, code, math highlights)
  const formatInlineText = (text) => {
    if (!text) return '';
    // Split by inline code, bold, and math markers
    const segments = text.split(/(\*\*.*?\*\*|`.*?`|\$.*?\$)/g);
    return segments.map((seg, sIdx) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return <strong key={sIdx} style={{ fontWeight: 700, color: 'var(--ink-primary)' }}>{seg.slice(2, -2)}</strong>;
      }
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return (
          <code
            key={sIdx}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85em',
              backgroundColor: 'rgba(21, 21, 21, 0.06)',
              padding: '0.15rem 0.35rem',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {seg.slice(1, -1)}
          </code>
        );
      }
      if (seg.startsWith('$') && seg.endsWith('$')) {
        return (
          <span
            key={sIdx}
            style={{
              fontFamily: 'var(--font-mono)',
              fontStyle: 'italic',
              color: 'var(--brand-teal)',
              padding: '0 0.15rem'
            }}
          >
            {seg.slice(1, -1)}
          </span>
        );
      }
      return seg;
    });
  };

  // Helper to parse text with code blocks, tables, headings, and clean bullet lists
  const renderFormattedContent = (content) => {
    if (!content || typeof content !== 'string') return null;

    // Handle unclosed code blocks during active streaming
    const safeContent = content.split('```').length % 2 === 0 ? content + '\n```' : content;

    // Split by fenced code blocks
    const parts = safeContent.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const lang = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
        const code = lang ? lines.slice(1).join('\n') : lines.join('\n');
        const codeId = `code-${index}`;
        const isCopied = copiedCodeId === codeId;

        return (
          <div
            key={index}
            style={{
              margin: '1rem 0',
              backgroundColor: '#1E1E1E',
              color: '#D4D4D4',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid #333333',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.4rem 0.85rem',
                backgroundColor: '#2D2D2D',
                borderBottom: '1px solid #3E3E3E',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: '#858585'
              }}
            >
              <span>{lang ? lang.toUpperCase() : 'CODE'}</span>
              <button
                type="button"
                onClick={() => handleCopyCode(code, codeId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: isCopied ? 'var(--brand-teal)' : '#CCCCCC',
                  fontSize: '0.72rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.2rem 0.4rem'
                }}
                aria-label="Copy code block"
              >
                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                <span>{isCopied ? "Copied" : "Copy Code"}</span>
              </button>
            </div>
            <pre
              style={{
                padding: '1rem',
                margin: 0,
                overflowX: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                lineHeight: 1.6
              }}
            >
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Pre-process part to normalize headings and horizontal rules so they separate cleanly
      const normalizedPart = part
        .replace(/\n?(#{1,6}\s+[^\n]+)/g, '\n\n$1\n\n')
        .replace(/\n?(---|\*\*\*)\n?/g, '\n\n---\n\n');

      const blocks = normalizedPart.split(/\n\n+/);

      return (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {blocks.map((block, bIdx) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            // Check if table
            if (trimmed.includes('|') && trimmed.split('\n').length >= 2) {
              const rows = trimmed.split('\n').filter(r => r.trim().startsWith('|'));
              if (rows.length >= 2) {
                const headerRow = rows[0].split('|').map(c => c.trim()).filter(Boolean);
                const dataRows = rows.slice(2).map(r => r.split('|').map(c => c.trim()).filter(Boolean));

                return (
                  <div key={bIdx} style={{ overflowX: 'auto', margin: '0.75rem 0' }}>
                    <table className="custom-table" style={{ fontSize: '0.85rem' }}>
                      <thead>
                        <tr>
                          {headerRow.map((h, hIdx) => (
                            <th key={hIdx}>{formatInlineText(h)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dataRows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx}>{formatInlineText(cell)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }

            // Headings
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={bIdx} style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink-primary)', marginTop: '0.65rem' }}>
                  {formatInlineText(trimmed.replace('### ', ''))}
                </h3>
              );
            }
            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={bIdx} style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink-primary)', marginTop: '0.45rem' }}>
                  {formatInlineText(trimmed.replace('#### ', ''))}
                </h4>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={bIdx} style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-primary)', marginTop: '0.85rem' }}>
                  {formatInlineText(trimmed.replace('## ', ''))}
                </h2>
              );
            }
            if (trimmed === '---') {
              return <hr key={bIdx} style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '0.75rem 0' }} />;
            }

            // Blockquotes / Exam & Interview Tips
            if (trimmed.startsWith('>')) {
              const quoteContent = trimmed.replace(/^>\s*/gm, '').trim();
              const isExamTip = quoteContent.toLowerCase().includes('exam') || quoteContent.toLowerCase().includes('interview') || quoteContent.toLowerCase().includes('tip');
              return (
                <div
                  key={bIdx}
                  style={{
                    margin: '0.85rem 0',
                    padding: '0.85rem 1.15rem',
                    backgroundColor: isExamTip ? 'rgba(217, 45, 32, 0.05)' : 'var(--bg-muted)',
                    borderLeft: isExamTip ? '4px solid var(--brand-coral)' : '4px solid var(--border-medium)',
                    borderRadius: '0 6px 6px 0',
                    color: 'var(--ink-primary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6
                  }}
                >
                  {formatInlineText(quoteContent)}
                </div>
              );
            }

            // Unordered Lists
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n').map(li => li.replace(/^[-*]\s+/, '').trim()).filter(Boolean);
              return (
                <ul key={bIdx} style={{ paddingLeft: '1.25rem', margin: '0.35rem 0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {items.map((it, iIdx) => (
                    <li key={iIdx} style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                      {formatInlineText(it)}
                    </li>
                  ))}
                </ul>
              );
            }

            // Numbered Lists
            if (/^\d+\.\s+/.test(trimmed)) {
              const items = trimmed.split('\n').map(li => li.replace(/^\d+\.\s+/, '').trim()).filter(Boolean);
              return (
                <ol key={bIdx} style={{ paddingLeft: '1.25rem', margin: '0.35rem 0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {items.map((it, iIdx) => (
                    <li key={iIdx} style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>
                      {formatInlineText(it)}
                    </li>
                  ))}
                </ol>
              );
            }

            // Regular Paragraph
            return (
              <p key={bIdx} style={{ fontSize: '0.925rem', lineHeight: 1.7, margin: 0 }}>
                {formatInlineText(trimmed)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  if (isUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
        <div
          style={{
            maxWidth: '80%',
            backgroundColor: 'var(--ink-primary)',
            color: 'var(--ink-inverse)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {message.attachments && message.attachments.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.5rem' }}>
              {message.attachments.map((att, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.72rem',
                    padding: '0.2rem 0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-btn)'
                  }}
                >
                  <FileText size={11} />
                  <span>{att}</span>
                </span>
              ))}
            </div>
          )}
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {message.content}
          </p>
          <div style={{ fontSize: '0.7rem', opacity: 0.65, marginTop: '0.4rem', textAlign: 'right' }}>
            {message.timestamp}
          </div>
        </div>
      </div>
    );
  }

  // Assistant Message
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1.5rem', width: '100%' }}>
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '900px',
          padding: '1.5rem',
          borderRadius: '10px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {/* Header Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '4px', backgroundColor: 'var(--ink-primary)', color: 'var(--brand-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={13} strokeWidth={2.4} aria-hidden="true" />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
              Campus<span style={{ color: 'var(--brand-coral)' }}>AI</span> Assistant
            </span>
            {message.format && (
              <span className="badge" style={{ fontSize: '0.7rem' }}>
                {message.format}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
            {message.timestamp}
          </span>
        </div>

        {/* Formatted Content */}
        <div style={{ color: 'var(--ink-primary)', lineHeight: 1.7 }}>
          {renderFormattedContent(message.content)}
          {message.isStreaming && (
            <span className="streaming-cursor" aria-label="Streaming answer" />
          )}
        </div>

        {/* Source Citations */}
        {message.sources && message.sources.length > 0 && (
          <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Document Citations:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.35rem' }}>
              {message.sources.map((src, idx) => (
                <span key={idx} className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                  <FileText size={11} style={{ marginRight: '3px' }} />
                  {src}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Clickable Follow-Up Suggestion Chips */}
        {!isUser && !message.isStreaming && suggestions && suggestions.length > 0 && (
          <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '0.55rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--ink-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <Sparkles size={12} color="var(--brand-coral)" />
              <span>Suggested Follow-Ups</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {suggestions.map((chip, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => onSelectSuggestion && onSelectSuggestion(chip)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    fontSize: '0.78rem',
                    padding: '0.35rem 0.7rem',
                    borderRadius: 'var(--radius-btn)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderColor: 'var(--border-medium)',
                    transition: 'all 0.15s ease',
                    lineHeight: 1.3
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-coral)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
                    e.currentTarget.style.color = 'var(--brand-coral)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                    e.currentTarget.style.color = 'var(--ink-primary)';
                  }}
                  title={`Ask: "${chip}"`}
                >
                  <span>{chip}</span>
                  <ChevronRight size={12} color="var(--brand-coral)" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Bar Under Every AI Message (Hidden during streaming) */}
        {!message.isStreaming && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.25rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
            aria-label="Message action toolbar"
          >
            {/* 1. Copy Answer */}
            <button
              onClick={handleCopyAnswer}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              title="Copy entire formatted answer"
              aria-label="Copy Answer"
            >
              {copiedAnswer ? <Check size={13} color="var(--brand-teal)" /> : <Copy size={13} />}
              <span>{copiedAnswer ? "Copied!" : "Copy Answer"}</span>
            </button>

            {/* 2. Regenerate */}
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                title="Regenerate this response with an alternative perspective"
                aria-label="Regenerate Answer"
              >
                <RefreshCw size={13} />
                <span>Regenerate</span>
              </button>
            )}

            {/* 3. Save to My Summaries */}
            <button
              onClick={handleSaveToSummaries}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              title="Save explanation as a new unit summary"
              aria-label="Save to My Summaries"
            >
              <BookmarkPlus size={13} color="var(--brand-teal)" />
              <span>{saveSummarySuccess ? "Saved to Summaries!" : "Save to My Summaries"}</span>
            </button>

            {/* 4. Convert to Flashcards */}
            <button
              onClick={handleConvertToFlashcards}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              title="Generate flashcards from key concepts"
              aria-label="Convert to Flashcards"
            >
              <Layers size={13} color="var(--brand-coral)" />
              <span>{flashcardsSuccess ? "Flashcards Created!" : "Convert to Flashcards"}</span>
            </button>

            {/* 5. Generate 5-Question Quiz */}
            <button
              onClick={handleGenerateQuiz}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              title="Create an instant 5-question test and navigate to Quizzes"
              aria-label="Generate 5-Question Quiz"
            >
              <Award size={13} />
              <span>Generate 5-Question Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
