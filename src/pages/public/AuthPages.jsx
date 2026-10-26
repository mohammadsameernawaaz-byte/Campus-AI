import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, User, Mail, Lock, ShieldCheck, CheckSquare, Square, ArrowRight, GraduationCap } from 'lucide-react';
import { Combobox } from '../../components/common/Combobox';
import { POPULAR_UNIVERSITIES, DEGREE_BRANCHES, SEMESTER_OPTIONS } from '../../types/data';

export const LoginPage = () => {
  const { navigate, setUser } = useApp();
  const [email, setEmail] = useState('aarav.sharma@iiit.ac.in');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide valid credentials.');
      return;
    }

    setUser({
      isLoggedIn: true,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      role: role,
      college: "Indian Institute of Information Technology",
      semester: "Semester 6",
      examPattern: "JNTU Hyderabad (JNTUH) R22 Regulation",
      plan: "Student Premium",
      planExpires: "2027-05-30"
    });

    navigate('/dashboard');
  };

  return (
    <main id="main-content" style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>Secure Sign In</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Log In to CampusAI
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '0.35rem' }}>
            Access your university lecture notes and exam workspaces.
          </p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-soft-accent)', color: 'var(--brand-coral)', borderRadius: 'var(--radius-btn)', fontSize: '0.825rem', marginBottom: '1rem', fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.35rem',
          backgroundColor: 'var(--bg-muted)',
          padding: '0.3rem',
          borderRadius: 'var(--radius-btn)',
          marginBottom: '1.25rem'
        }}>
          {['Student', 'Faculty', 'Institution Admin'].map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                padding: '0.4rem 0.2rem',
                fontSize: '0.75rem',
                fontWeight: role === r ? 700 : 500,
                backgroundColor: role === r ? 'var(--bg-surface)' : 'transparent',
                color: role === r ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                borderRadius: 'var(--radius-btn)',
                boxShadow: role === r ? 'var(--shadow-sm)' : 'none',
                textAlign: 'center'
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Academic Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.ac.in"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            <span>Sign In as {role}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>
          Don't have an academic account?{' '}
          <button
            onClick={() => navigate('/signup')}
            style={{ color: 'var(--brand-coral)', fontWeight: 700, textDecoration: 'underline' }}
          >
            Create free account
          </button>
        </div>
      </div>
    </main>
  );
};

export const SignupPage = () => {
  const { navigate, setUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState(POPULAR_UNIVERSITIES[0]);
  const [degree, setDegree] = useState(DEGREE_BRANCHES[0]);
  const [semester, setSemester] = useState(SEMESTER_OPTIONS[0]);
  const [role, setRole] = useState('Student');
  const [ageConsent, setAgeConsent] = useState(false);
  const [legalConsent, setLegalConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !college || !degree || !semester) {
      setError('Please fill in all required academic onboarding fields.');
      return;
    }
    if (!ageConsent) {
      setError('You must confirm age eligibility to proceed.');
      return;
    }
    if (!legalConsent) {
      setError('You must agree to the Privacy Policy, Terms of Service, and Refund Policy.');
      return;
    }

    setUser({
      isLoggedIn: true,
      name: name,
      email: email,
      role: role,
      college: college,
      degree: degree,
      semester: semester,
      examPattern: "General University Standard Blueprint",
      plan: "Free Plan",
      planExpires: "Active"
    });

    navigate('/dashboard');
  };

  return (
    <main id="main-content" style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '580px', padding: '2.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.5rem' }}>Student Onboarding</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Start Your Academic Workspace
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginTop: '0.35rem' }}>
            Personalize your study materials to your university, degree, and semester.
          </p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-soft-accent)', color: 'var(--brand-coral)', borderRadius: 'var(--radius-btn)', fontSize: '0.825rem', marginBottom: '1rem', fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.35rem',
          backgroundColor: 'var(--bg-muted)',
          padding: '0.3rem',
          borderRadius: 'var(--radius-btn)',
          marginBottom: '1.25rem'
        }}>
          {['Student', 'Faculty', 'Institution Admin'].map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                padding: '0.4rem 0.2rem',
                fontSize: '0.75rem',
                fontWeight: role === r ? 700 : 500,
                backgroundColor: role === r ? 'var(--bg-surface)' : 'transparent',
                color: role === r ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                borderRadius: 'var(--radius-btn)',
                boxShadow: role === r ? 'var(--shadow-sm)' : 'none',
                textAlign: 'center'
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priyanshu Das"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Academic / Personal Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priyanshu@campus.edu.in"
              style={{ width: '100%' }}
            />
          </div>

          {/* Searchable Multi-College Combobox */}
          <Combobox
            label="College / University Name"
            required={true}
            options={POPULAR_UNIVERSITIES}
            value={college}
            onChange={(selectedCollege) => setCollege(selectedCollege)}
            placeholder="Search university or enter custom college name..."
          />

          {/* Degree & Semester Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Degree / Branch *
              </label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                {DEGREE_BRANCHES.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Semester / Year *
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                {SEMESTER_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Explicit Unchecked Consent Checkboxes (Requirement 3.3) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-muted)',
            borderRadius: 'var(--radius-btn)',
            marginTop: '0.5rem',
            fontSize: '0.8rem'
          }}>
            {/* Age Consent */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={ageConsent}
                onChange={(e) => setAgeConsent(e.target.checked)}
                style={{ marginTop: '3px' }}
              />
              <span style={{ color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
                I confirm that I am at least 18 years old, or have verifiable parental/institutional consent to create an account. *
              </span>
            </label>

            {/* Legal Consent */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={legalConsent}
                onChange={(e) => setLegalConsent(e.target.checked)}
                style={{ marginTop: '3px' }}
              />
              <span style={{ color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
                I have read and agree to the <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }} style={{ textDecoration: 'underline', color: 'var(--ink-primary)', fontWeight: 600 }}>Privacy Policy</a>, <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); navigate('/terms-of-service'); }} style={{ textDecoration: 'underline', color: 'var(--ink-primary)', fontWeight: 600 }}>Terms of Service</a>, and <a href="/refund-policy" onClick={(e) => { e.preventDefault(); navigate('/refund-policy'); }} style={{ textDecoration: 'underline', color: 'var(--ink-primary)', fontWeight: 600 }}>Refund Policy</a>. *
              </span>
            </label>

            {/* Optional Email Consent */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={emailConsent}
                onChange={(e) => setEmailConsent(e.target.checked)}
                style={{ marginTop: '3px' }}
              />
              <span style={{ color: 'var(--ink-muted)', lineHeight: 1.4 }}>
                (Optional) Send me product updates and study tips. You can unsubscribe at any time with one click.
              </span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
            <span>Create Workspace</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{ color: 'var(--brand-coral)', fontWeight: 700, textDecoration: 'underline' }}
          >
            Sign in
          </button>
        </div>
      </div>
    </main>
  );
};
