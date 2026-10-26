import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle,
  Eye,
  Plus,
  Filter,
  CheckSquare,
  Square,
  Tag,
  AlertCircle,
  Award,
  BookOpen
} from 'lucide-react';
import { EXAM_PATTERNS } from '../../types/data';

import { parseDocumentClientSide } from '../../utils/documentParser';

export const UploadView = () => {
  const { user, documents = [], addDocument, deleteDocument, batchDeleteDocuments, setActiveStudyDrawerDoc } = useApp();
  const [selectedIds, setSelectedIds] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [uploadSubject, setUploadSubject] = useState('Computer Science and Engineering');
  const [uploadUnit, setUploadUnit] = useState('Unit 1: Fundamentals');
  const [uploadExamPattern, setUploadExamPattern] = useState(user?.examPattern || EXAM_PATTERNS[0].name);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef(null);

  const subjects = ['All', ...new Set((documents || []).map(d => d.subject))];

  const filteredDocs = subjectFilter === 'All'
    ? (documents || [])
    : (documents || []).filter(d => d.subject === subjectFilter);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredDocs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredDocs.map(d => d.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected document(s)?`)) {
      batchDeleteDocuments(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024; // 10MB limit
    if (file.size > maxSize) {
      alert(`File "${file.name}" exceeds the 10MB upload limit.`);
      return;
    }

    try {
      const newDoc = await parseDocumentClientSide(file, uploadSubject, uploadUnit, uploadExamPattern);
      addDocument(newDoc);
      setUploadSuccess(`Ingested "${file.name}" with subject "${uploadSubject}" and Exam Pattern "${uploadExamPattern}". Generated comprehensive summaries, 6 exam questions, 4 quiz MCQs, 3 viva questions, and 4 flashcards!`);
      setTimeout(() => setUploadSuccess(''), 6000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error("Upload parse error:", err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
          Study Materials & Syllabus Document Manager
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
          Organize course notes, tag university examination patterns, inspect file sizes, and perform batch operations.
        </p>
      </div>

      {/* Upload with Metadata Box */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
          Upload New Document with University Exam Pattern Tagging
        </h2>

        {uploadSuccess && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-teal-subtle)', color: 'var(--brand-teal)', borderRadius: 'var(--radius-btn)', fontSize: '0.825rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={16} />
            <span>{uploadSuccess}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Subject Name
            </label>
            <input
              type="text"
              value={uploadSubject}
              onChange={(e) => setUploadSubject(e.target.value)}
              placeholder="e.g. Database Management Systems"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Syllabus Unit Mapping
            </label>
            <input
              type="text"
              value={uploadUnit}
              onChange={(e) => setUploadUnit(e.target.value)}
              placeholder="e.g. Unit 2: Relational Calculus & Normalization"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              University Exam Pattern *
            </label>
            <select
              value={uploadExamPattern}
              onChange={(e) => setUploadExamPattern(e.target.value)}
              style={{ width: '100%', fontSize: '0.85rem' }}
            >
              {EXAM_PATTERNS.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
            <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginTop: '0.2rem' }}>
              Calibrates 2-mark, 5-mark, and 10-mark questions to this marking scheme.
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
          style={{ display: 'none' }}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-primary"
        >
          <UploadCloud size={16} aria-hidden="true" />
          <span>Select Document to Ingest & Parse (Max 10MB)</span>
        </button>
      </div>

      {/* Document Library Table with Batch Controls */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
          {/* Subject Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="var(--ink-secondary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filter Subject:</span>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.85rem' }}
            >
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Batch Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {selectedIds.length > 0 && (
              <button
                onClick={handleBatchDelete}
                className="btn btn-secondary btn-sm"
                style={{ color: 'var(--brand-coral)', borderColor: 'rgba(217, 45, 32, 0.4)' }}
              >
                <Trash2 size={14} />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            )}
            <span className="badge" style={{ fontSize: '0.75rem' }}>
              Showing {filteredDocs.length} {filteredDocs.length === 1 ? 'file' : 'files'}
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={filteredDocs.length > 0 && selectedIds.length === filteredDocs.length}
                    onChange={toggleSelectAll}
                    aria-label="Select all documents"
                  />
                </th>
                <th>Document Name & Pages</th>
                <th>Subject Tag</th>
                <th>Exam Pattern</th>
                <th>Syllabus Unit</th>
                <th>File Size</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink-muted)' }}>
                    No documents found matching the selected subject filter.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  const isChecked = selectedIds.includes(doc.id);
                  return (
                    <tr key={doc.id} style={{ backgroundColor: isChecked ? 'var(--bg-muted)' : 'transparent' }}>
                      <td>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(doc.id)}
                          aria-label={`Select ${doc.name}`}
                        />
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FileText size={16} color="var(--brand-coral)" />
                          <div>
                            <span style={{ fontWeight: 600 }}>{doc.name}</span>
                            <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                              {doc.pageCount} pages • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge" style={{ fontSize: '0.72rem' }}>
                          <Tag size={10} style={{ marginRight: '3px' }} />
                          {doc.subject}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                          {doc.examPattern || 'Standard Blueprint'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem' }}>{doc.unit}</span>
                      </td>
                      <td>
                        <span className="font-mono" style={{ fontSize: '0.8rem' }}>{doc.size}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            onClick={() => setActiveStudyDrawerDoc(doc)}
                            className="btn btn-primary btn-sm"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                          >
                            <Eye size={13} />
                            <span>Study</span>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
