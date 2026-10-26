import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export const UnsubscribePage = () => {
  const { navigate } = useApp();
  const [email, setEmail] = useState('');
  const [unsubscribed, setUnsubscribed] = useState(false);

  const handleUnsubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setUnsubscribed(true);
    }
  };

  return (
    <main id="main-content" style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '6px',
          backgroundColor: 'var(--bg-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          color: 'var(--ink-primary)'
        }}>
          <Mail size={24} aria-hidden="true" />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '0.5rem' }}>
          Email Communication Preferences
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', lineHeight: 1.5, marginBottom: '1.75rem' }}>
          We respect your inbox. You can opt out of non-essential academic newsletters, product announcements, and study tips with one click.
        </p>

        {unsubscribed ? (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-muted)',
            borderRadius: 'var(--radius-btn)',
            border: '1px solid var(--brand-teal)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--brand-teal)', fontWeight: 700, marginBottom: '0.5rem' }}>
              <CheckCircle size={18} />
              <span>Unsubscribed Successfully</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>
              {email} has been removed from all marketing broadcasts. You will continue to receive critical security receipts and password recovery emails only.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1rem' }}
            >
              Return to CampusAI Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleUnsubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{ width: '100%' }}
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <span>Unsubscribe from Marketing</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </main>
  );
};
