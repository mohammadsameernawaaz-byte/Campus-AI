import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Cookie, Check, X } from 'lucide-react';

export const CookieBanner = () => {
  const { isCookieBannerOpen, setIsCookieBannerOpen, saveCookieConsent } = useApp();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: true,
    analytics: false
  });

  if (!isCookieBannerOpen) return null;

  const handleAcceptAll = () => {
    saveCookieConsent('all');
  };

  const handleRejectNonEssential = () => {
    saveCookieConsent('essential-only');
  };

  const handleSavePreferences = () => {
    saveCookieConsent(JSON.stringify(preferences));
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        right: '1.5rem',
        maxWidth: '820px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-surface)',
        border: '2px solid var(--ink-primary)',
        borderRadius: 'var(--radius-card)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 9999,
        transition: 'all var(--transition-fast)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--bg-soft-accent)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-coral)'
          }}>
            <Cookie size={18} aria-hidden="true" />
          </div>
          <h3 id="cookie-banner-title" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            Cookie & Privacy Preferences
          </h3>
        </div>
        <button
          onClick={() => setIsCookieBannerOpen(false)}
          style={{ padding: '0.35rem', color: 'var(--ink-secondary)' }}
          aria-label="Dismiss cookie banner"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <p id="cookie-banner-desc" style={{ fontSize: '0.875rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
        CampusAI utilizes strictly necessary browser storage to maintain student authentication, preserve study plan checklists, and store quiz progress. Optional analytical cookies assist us in diagnosing platform performance without third-party ad trackers. Both choices carry equal validity.
      </p>

      {showPreferences && (
        <div style={{
          backgroundColor: 'var(--bg-muted)',
          borderRadius: 'var(--radius-btn)',
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          fontSize: '0.85rem'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'not-allowed' }}>
            <div>
              <strong>Strictly Necessary Storage (Required)</strong>
              <div style={{ color: 'var(--ink-muted)', fontSize: '0.78rem' }}>Session tokens, active document parsing, and offline study cache.</div>
            </div>
            <input type="checkbox" checked disabled style={{ cursor: 'not-allowed' }} />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <strong>Functional Preferences</strong>
              <div style={{ color: 'var(--ink-muted)', fontSize: '0.78rem' }}>Preserves study timer settings, summary depth selection, and quiz audio toggles.</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.functional}
              onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <strong>Anonymous Telemetry & Error Diagnostics</strong>
              <div style={{ color: 'var(--ink-muted)', fontSize: '0.78rem' }}>Collects anonymized page load latencies to improve document rendering.</div>
            </div>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
            />
          </label>
        </div>
      )}

      {/* Buttons with Strict Equal Visual Weight (No Dark Patterns) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <button
          onClick={() => setShowPreferences(!showPreferences)}
          style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-secondary)', textDecoration: 'underline' }}
        >
          {showPreferences ? "Hide Detailed Options" : "Customize Storage Options"}
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          <button
            onClick={handleRejectNonEssential}
            className="btn btn-secondary"
            style={{ minWidth: '150px' }}
          >
            Reject Non-Essential
          </button>
          {showPreferences ? (
            <button
              onClick={handleSavePreferences}
              className="btn btn-primary"
              style={{ minWidth: '150px' }}
            >
              Save My Preferences
            </button>
          ) : (
            <button
              onClick={handleAcceptAll}
              className="btn btn-primary"
              style={{ minWidth: '150px' }}
            >
              Accept Selected
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
