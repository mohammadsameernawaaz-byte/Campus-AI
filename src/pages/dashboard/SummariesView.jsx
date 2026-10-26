import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Copy, Download, CheckCircle2, RefreshCw, BookOpen, Layers } from 'lucide-react';

export const SummariesView = () => {
  const { documents = [] } = useApp();
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || '');
  const [depth, setDepth] = useState('detailed'); // 'brief' | 'detailed' | 'examCram'
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const currentDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleCopy = () => {
    if (!currentDoc) return;
    const text = `${currentDoc.name} Summary (${depth.toUpperCase()}):\n\n${currentDoc.summary[depth]}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format = 'md') => {
    if (!currentDoc) return;
    let content = '';
    if (format === 'txt') {
      content = `${currentDoc.name} - Unit Summary\n`;
      content += `Subject: ${currentDoc.subject}\n`;
      content += `Syllabus Unit: ${currentDoc.unit}\n`;
      content += `Depth: ${depth.toUpperCase()}\n\n`;
      content += `--- SUMMARY CONTENT ---\n${currentDoc.summary[depth]}\n\n`;

      if (currentDoc.summary.keyDefinitions) {
        content += `--- KEY DEFINITIONS ---\n`;
        currentDoc.summary.keyDefinitions.forEach(kd => {
          content += `- ${kd.term}: ${kd.definition}\n`;
        });
        content += `\n`;
      }

      if (currentDoc.summary.formulas) {
        content += `--- FORMULA SHEET ---\n`;
        currentDoc.summary.formulas.forEach(f => {
          content += `- ${f.title}: ${f.formula}\n`;
        });
      }
    } else {
      content = `# ${currentDoc.name} - Unit Summary\n`;
      content += `Subject: ${currentDoc.subject}\n`;
      content += `Syllabus Unit: ${currentDoc.unit}\n`;
      content += `Depth: ${depth.toUpperCase()}\n\n`;
      content += `## Summary Content\n${currentDoc.summary[depth]}\n\n`;

      if (currentDoc.summary.keyDefinitions) {
        content += `## Key Definitions\n`;
        currentDoc.summary.keyDefinitions.forEach(kd => {
          content += `- **${kd.term}**: ${kd.definition}\n`;
        });
        content += `\n`;
      }

      if (currentDoc.summary.formulas) {
        content += `## Formula Sheet\n`;
        currentDoc.summary.formulas.forEach(f => {
          content += `- **${f.title}**: \`${f.formula}\`\n`;
        });
      }
    }

    const mimeType = format === 'txt' ? 'text/plain' : 'text/markdown';
    const ext = format === 'txt' ? 'txt' : 'md';
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDoc.name.replace(/\.[^/.]+$/, "")}_Summary_${depth}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = (newDepth) => {
    setRegenerating(true);
    setDepth(newDepth);
    setTimeout(() => {
      setRegenerating(false);
    }, 400);
  };

  if (!currentDoc) {
    return (
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Unit Summaries & Formula Sheets</h1>
        <p style={{ marginTop: '1rem', color: 'var(--ink-secondary)' }}>No documents uploaded. Please upload a study material first.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Course Summaries & Formula Sheets
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
            Multi-depth conceptual syntheses extracted from your uploaded academic materials.
          </p>
        </div>

        {/* Document Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Material:</label>
          <select
            value={currentDoc.id}
            onChange={(e) => setSelectedDocId(e.target.value)}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', maxWidth: '280px' }}
          >
            {documents.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="card" style={{ padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        {/* Depth Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
            Regenerate by Depth:
          </span>
          {[
            { id: 'brief', label: 'Brief (5 Min)' },
            { id: 'detailed', label: 'Detailed (Full Unit)' },
            { id: 'examCram', label: 'Exam Cram (High Probability)' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => handleRegenerate(d.id)}
              style={{
                padding: '0.4rem 0.85rem',
                fontSize: '0.825rem',
                fontWeight: depth === d.id ? 700 : 500,
                borderRadius: 'var(--radius-btn)',
                backgroundColor: depth === d.id ? 'var(--ink-primary)' : 'var(--bg-muted)',
                color: depth === d.id ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {depth === d.id && regenerating && <RefreshCw size={12} className="spin" />}
              <span>{d.label}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleCopy}
            className="btn btn-secondary btn-sm"
          >
            {copied ? <CheckCircle2 size={15} style={{ color: 'green' }} /> : <Copy size={15} />}
            <span>{copied ? "Copied" : "Copy Summary"}</span>
          </button>
          <button
            onClick={() => handleDownload('md')}
            className="btn btn-primary btn-sm"
            title="Download formatted Markdown summary"
          >
            <Download size={14} />
            <span>Download MD</span>
          </button>
          <button
            onClick={() => handleDownload('txt')}
            className="btn btn-secondary btn-sm"
            title="Download plain text summary"
          >
            <Download size={14} />
            <span>Download TXT</span>
          </button>
        </div>
      </div>

      {/* Active Document Info Banner */}
      <div style={{
        padding: '1rem 1.5rem',
        backgroundColor: 'var(--bg-muted)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: 'var(--bg-surface)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-coral)' }}>
            <FileText size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{currentDoc.name}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>{currentDoc.subject} • {currentDoc.unit}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-teal">{currentDoc.size}</span>
          <span className="badge">{currentDoc.fileType.toUpperCase()}</span>
          <span className="badge badge-coral">{depth.toUpperCase()} MODE</span>
        </div>
      </div>

      {/* Structured Summary Body */}
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--ink-primary)' }}>
          Extracted Unit Summary
        </h2>
        <div style={{
          lineHeight: 1.75,
          fontSize: '0.975rem',
          color: 'var(--ink-primary)',
          whiteSpace: 'pre-line',
          backgroundColor: 'var(--bg-surface)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-btn)',
          border: '1px solid var(--border-subtle)'
        }}>
          {currentDoc.summary[depth]}
        </div>
      </div>

      {/* Key Definitions & Formulas */}
      <div className="grid-2">
        {/* Key Definitions */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--ink-primary)' }}>
            Key Academic Definitions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {currentDoc.summary.keyDefinitions?.map((kd, idx) => (
              <div key={idx} style={{ padding: '0.85rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-teal)', marginBottom: '0.2rem' }}>
                  {kd.term}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                  {kd.definition}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formula Sheet */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--ink-primary)' }}>
            Formula Sheet & Identities
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {currentDoc.summary.formulas?.map((f, idx) => (
              <div key={idx} style={{ padding: '0.85rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '0.25rem' }}>
                  {f.title}
                </div>
                <code style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-primary)', display: 'block' }}>
                  {f.formula}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
