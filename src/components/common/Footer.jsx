import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Mail, MapPin, ExternalLink, Cookie } from 'lucide-react';

const LinkedInIcon = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer = () => {
  const { navigate, setIsCookieBannerOpen } = useApp();

  return (
    <footer style={{
      backgroundColor: 'var(--ink-primary)',
      color: 'var(--ink-inverse)',
      borderTop: '1px solid #2a2a2a',
      paddingTop: '3.5rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid #2a2a2a'
        }}>
          {/* Company & Office Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--brand-coral)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <BookOpen size={18} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                CampusAI
              </span>
            </div>
            <p style={{ color: '#A0A0A0', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Academic exam preparation and document intelligence platform for undergraduate and postgraduate students.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem', color: '#C0C0C0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} style={{ color: 'var(--brand-coral)', flexShrink: 0 }} aria-hidden="true" />
                <span>Location: Hyderabad, Telangana, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <Mail size={15} style={{ color: 'var(--brand-coral)', flexShrink: 0 }} aria-hidden="true" />
                <span>
                  General Support:{' '}
                  <a href="mailto:mohammadsameernawaaz@gmail.com" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
                    mohammadsameernawaaz@gmail.com
                  </a>
                </span>
              </div>
            </div>

            {/* Creators & Team Section */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #2a2a2a' }}>
              <h5 style={{ color: '#FFFFFF', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Creators & Team
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem' }}>
                <a
                  href="https://www.linkedin.com/in/md-sameer-nawaz-aa79673b6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#D0D0D0', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                  className="footer-link"
                >
                  <LinkedInIcon size={14} color="#0077b5" />
                  <span><strong>MD Sameer Nawaz</strong></span>
                  <ExternalLink size={11} style={{ opacity: 0.7 }} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/lav-kumar-singh-6539063b3"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#D0D0D0', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                  className="footer-link"
                >
                  <LinkedInIcon size={14} color="#0077b5" />
                  <span><strong>Lav Kumar Singh</strong></span>
                  <ExternalLink size={11} style={{ opacity: 0.7 }} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Academic Features */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.925rem', fontWeight: 700, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Modules
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => navigate('/dashboard/summaries')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Document Summarizer
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard/questions')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  2-Mark and 10-Mark Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard/quizzes')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Interactive Practice Quizzes
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard/viva')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Oral Viva Voce Simulator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard/flashcards')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Active Recall Flashcards
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard/study-plan')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Exam Countdown Scheduler
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional & Pricing */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.925rem', fontWeight: 700, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => navigate('/features')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Document Parser Engine
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Student and College Pricing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  About Us and Ethics
                </button>
              </li>
              <li>
                <a href="/licenses.txt" target="_blank" rel="noopener noreferrer" style={{ color: '#B0B0B0', display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="footer-link">
                  <span>Open-Source Licenses</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
              <li>
                <button onClick={() => navigate('/unsubscribe')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Email Preferences
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.925rem', fontWeight: 700, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Trust and Compliance
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => navigate('/privacy-policy')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Privacy Policy (DPDP & GDPR)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms-of-service')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/refund-policy')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Refund Policy (7-Day Guarantee)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cookie-policy')} style={{ color: '#B0B0B0', textAlign: 'left' }} className="footer-link">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCookieBannerOpen(true)}
                  style={{
                    color: '#FFFFFF',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontWeight: 600,
                    marginTop: '0.25rem'
                  }}
                  className="footer-link"
                >
                  <Cookie size={14} style={{ color: 'var(--brand-coral)' }} aria-hidden="true" />
                  <span>Manage Cookies</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div style={{
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: '#808080'
        }}>
          <div>
            Copyright 2026 CampusAI. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Private student uploads are never used to train public foundation models.</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: #FFFFFF !important;
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
};
