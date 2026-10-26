import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, ArrowLeft, Home, BookOpen } from 'lucide-react';

export const NotFoundPage = () => {
  const { navigate } = useApp();

  return (
    <main id="main-content" style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '6px',
          backgroundColor: 'var(--bg-soft-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: 'var(--brand-coral)'
        }}>
          <AlertCircle size={28} aria-hidden="true" />
        </div>

        <span className="badge" style={{ marginBottom: '0.75rem' }}>Error 404</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '0.75rem' }}>
          Academic Page Not Found
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
          The requested study resource, syllabus unit, or route does not exist or may have been reorganized.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Go Back</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-coral"
          >
            <BookOpen size={16} aria-hidden="true" />
            <span>Go to Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            <Home size={16} aria-hidden="true" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </main>
  );
};
