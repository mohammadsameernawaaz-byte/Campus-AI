import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  User,
  Shield,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Cookie,
  CreditCard,
  GraduationCap,
  BookOpen,
  Sparkles,
  Key,
  ExternalLink
} from 'lucide-react';
import { Combobox } from '../../components/common/Combobox';
import { POPULAR_UNIVERSITIES, DEGREE_BRANCHES, SEMESTER_OPTIONS, EXAM_PATTERNS } from '../../types/data';

export const SettingsView = () => {
  const {
    user,
    setUser,
    exportUserData,
    purgeAllUserData,
    setIsCookieBannerOpen,
    geminiApiKey,
    saveGeminiApiKey
  } = useApp();

  const [profileName, setProfileName] = useState(user?.name || 'Aarav Sharma');
  const [profileCollege, setProfileCollege] = useState(user?.college || POPULAR_UNIVERSITIES[0]);
  const [profileDegree, setProfileDegree] = useState(user?.degree || DEGREE_BRANCHES[0]);
  const [profileSemester, setProfileSemester] = useState(user?.semester || SEMESTER_OPTIONS[0]);
  const [profileExamPattern, setProfileExamPattern] = useState(user?.examPattern || EXAM_PATTERNS[0].name);
  const [saveSuccess, setSaveSuccess] = useState('');

  const [apiKeyInput, setApiKeyInput] = useState(geminiApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState('');

  const [showPurgeConfirm, setShowPurgeConfirm] = useState(false);
  const [purgeInput, setPurgeInput] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name: profileName,
      college: profileCollege,
      degree: profileDegree,
      semester: profileSemester,
      examPattern: profileExamPattern
    });
    setSaveSuccess('Academic profile and university preferences updated successfully.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleTierChange = (newPlan) => {
    setUser({
      ...user,
      plan: newPlan
    });
    setSaveSuccess(`Subscription tier adjusted to ${newPlan}.`);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handlePurgeAccount = () => {
    if (purgeInput === 'DELETE') {
      purgeAllUserData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '820px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
          Account Settings & Privacy Controls
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
          Manage your academic credentials, subscription tiers, data exports, and purge preferences.
        </p>
      </div>

      {saveSuccess && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-teal-subtle)', color: 'var(--brand-teal)', borderRadius: 'var(--radius-btn)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* 1. Profile Management */}
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={18} color="var(--brand-coral)" />
          <span>Academic Profile</span>
        </h2>

        <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Academic Email (Read Only)
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                style={{ width: '100%', backgroundColor: 'var(--bg-muted)', cursor: 'not-allowed' }}
              />
            </div>
          </div>

          {/* Searchable Multi-College Combobox */}
          <div>
            <Combobox
              label="College / University"
              required={true}
              options={POPULAR_UNIVERSITIES}
              value={profileCollege}
              onChange={(c) => setProfileCollege(c)}
              placeholder="Search or enter institution name..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Degree / Branch
              </label>
              <select
                value={profileDegree}
                onChange={(e) => setProfileDegree(e.target.value)}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                {DEGREE_BRANCHES.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Semester / Class Standing
              </label>
              <select
                value={profileSemester}
                onChange={(e) => setProfileSemester(e.target.value)}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                {SEMESTER_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Default University Exam Blueprint
            </label>
            <select
              value={profileExamPattern}
              onChange={(e) => setProfileExamPattern(e.target.value)}
              style={{ width: '100%', fontSize: '0.85rem' }}
            >
              {EXAM_PATTERNS.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
              Calibrates question mark distributions (2-mark, 5-mark, and 10-mark) to your college regulation.
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: 'fit-content', marginTop: '0.5rem' }}>
            Save Academic Profile
          </button>
        </form>
      </div>

      {/* 2. AI Engine & Optional Live Gemini API Key (gemini-2.5-flash) */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--brand-coral)" />
            <span>AI Knowledge Engine & Live Gemini API Connection</span>
          </h2>
          <span className="badge badge-teal">gemini-2.5-flash Supported</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
          CampusAI includes a high-performance built-in synthesis engine that generates full academic solutions out of the box with zero configuration required. You can optionally connect your personal Google Gemini API key for direct cloud model inference.
        </p>

        {apiKeySaved && (
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-teal-subtle)', color: 'var(--brand-teal)', borderRadius: 'var(--radius-btn)', fontSize: '0.825rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={15} />
            <span>{apiKeySaved}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Google Gemini API Key (Optional)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type={showKey ? "text" : "password"}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                aria-label="Google Gemini API Key"
              />
              <button
                type="button"
                onClick={() => setShowKey(prev => !prev)}
                className="btn btn-secondary btn-sm"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
              <span>Stored securely in local client browser storage only.</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--brand-coral)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <span>Get free Gemini API Key</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => {
                saveGeminiApiKey(apiKeyInput.trim());
                setApiKeySaved(apiKeyInput.trim() ? "Gemini 2.5 Flash API Key connected and active!" : "Reset to Built-in Intelligent Synthesis Engine.");
                setTimeout(() => setApiKeySaved(''), 4000);
              }}
              className="btn btn-primary btn-sm"
            >
              <Key size={14} />
              <span>Save AI Key</span>
            </button>
            {apiKeyInput && (
              <button
                type="button"
                onClick={() => {
                  setApiKeyInput('');
                  saveGeminiApiKey('');
                  setApiKeySaved("Cleared API Key. Using Built-in Synthesis Engine.");
                  setTimeout(() => setApiKeySaved(''), 4000);
                }}
                className="btn btn-secondary btn-sm"
              >
                Clear Key
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Subscription Tier Manager (Zero Dark Patterns) */}
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard size={18} color="var(--brand-teal)" />
          <span>Subscription & Billing Management</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.5rem' }}>
          Zero hidden fees or pre-checked renewals. Upgrade, downgrade, or cancel whenever you choose.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-card)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Current Active Tier
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink-primary)', marginTop: '0.15rem' }}>
              {user.plan}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.2rem' }}>
              Next renewal: {user.planExpires || "Active"}
            </div>
          </div>
          <span className="badge badge-coral">Active Status</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {user.plan !== 'Free Plan' && (
            <button
              onClick={() => handleTierChange('Free Plan')}
              className="btn btn-secondary btn-sm"
            >
              Downgrade to Free Plan (₹0)
            </button>
          )}
          {user.plan !== 'Student Premium' && (
            <button
              onClick={() => handleTierChange('Student Premium')}
              className="btn btn-primary btn-sm"
            >
              Upgrade to Student Premium (₹149/mo)
            </button>
          )}
          {user.plan !== 'College / Institution Plan' && (
            <button
              onClick={() => handleTierChange('College / Institution Plan')}
              className="btn btn-secondary btn-sm"
            >
              Switch to Institution Plan
            </button>
          )}
        </div>
      </div>

      {/* 3. Cookie & Privacy Controls */}
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cookie size={18} color="var(--brand-coral)" />
          <span>Storage & Cookie Settings</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
          Configure granular browser preferences or audit storage keys under DPDP Act / GDPR.
        </p>
        <button
          onClick={() => setIsCookieBannerOpen(true)}
          className="btn btn-secondary btn-sm"
        >
          <span>Modify Cookie Preferences</span>
        </button>
      </div>

      {/* 4. Export & Purge Data (Strict Compliance) */}
      <div className="card" style={{ padding: '2rem', border: '1px solid #F5C6CB' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--brand-coral)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} />
          <span>Data Portability & Permanent Deletion</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Under GDPR Article 20 and DPDP Act provisions, you have the right to download all your stored records or permanently erase your academic profile from CampusAI.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          {/* Export JSON Button */}
          <button
            onClick={exportUserData}
            className="btn btn-secondary"
          >
            <Download size={15} />
            <span>Export My Data (JSON)</span>
          </button>

          {/* Purge Button */}
          <button
            onClick={() => setShowPurgeConfirm(true)}
            className="btn btn-secondary"
            style={{ color: 'var(--brand-coral)', borderColor: 'rgba(217, 45, 32, 0.4)' }}
          >
            <Trash2 size={15} />
            <span>Delete Account & Purge All Uploaded Data</span>
          </button>
        </div>

        {/* Purge Confirmation Flow */}
        {showPurgeConfirm && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-soft-accent)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--brand-coral)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-coral)', marginBottom: '0.5rem' }}>
              Irreversible Account & Data Erasure
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              This action will permanently delete all uploaded lecture notes, extracted summaries, saved questions, flashcards, and completed quiz scores. This action cannot be undone.
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Type "DELETE" in capital letters to confirm:
              </label>
              <input
                type="text"
                value={purgeInput}
                onChange={(e) => setPurgeInput(e.target.value)}
                placeholder="DELETE"
                style={{ width: '100%', maxWidth: '280px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handlePurgeAccount}
                disabled={purgeInput !== 'DELETE'}
                className="btn btn-coral btn-sm"
                style={{ opacity: purgeInput === 'DELETE' ? 1 : 0.5, cursor: purgeInput === 'DELETE' ? 'pointer' : 'not-allowed' }}
              >
                Permanently Purge Everything
              </button>
              <button
                onClick={() => { setShowPurgeConfirm(false); setPurgeInput(''); }}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
