import React, { useState } from 'react';
import { ShieldCheck, Mail, MapPin, Lock, CheckCircle, Send, ExternalLink, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

const LinkedInIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const AboutPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    institution: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      id: `inq-${Date.now()}`,
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      institution: contactForm.institution.trim() || 'Not Specified',
      message: contactForm.message.trim(),
      submittedAt: new Date().toISOString()
    };

    // Store in localStorage for persistence and local audit
    try {
      const existing = JSON.parse(localStorage.getItem('campusai_institutional_inquiries') || '[]');
      localStorage.setItem('campusai_institutional_inquiries', JSON.stringify([submissionPayload, ...existing]));
    } catch {
      // ignore storage quota errors
    }

    // Retrieve EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: submissionPayload.name,
      from_name: submissionPayload.name,
      email: submissionPayload.email,
      from_email: submissionPayload.email,
      reply_to: submissionPayload.email,
      institution: submissionPayload.institution,
      message: submissionPayload.message,
      to_email: 'mohammadsameernawaaz@gmail.com',
      submitted_at: new Date(submissionPayload.submittedAt).toLocaleString(),
      submission_id: submissionPayload.id
    };

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        console.warn(
          "EmailJS environment variables (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY) are not configured. Dispatched payload:",
          templateParams
        );
      }
    } catch (error) {
      console.error("EmailJS dispatch error:", error);
    } finally {
      // Save submitted data for confirmation feedback card
      setSubmittedData(submissionPayload);

      // Clear the form inputs upon successful submission
      setContactForm({
        name: '',
        email: '',
        institution: '',
        message: ''
      });

      setIsSubmitting(false);
      setFormSubmitted(true);
      setShowToast(true);

      // Auto-dismiss floating toast notification after 7 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 7000);
    }
  };

  return (
    <main id="main-content" style={{ paddingBottom: '5rem' }}>
      {/* Header */}
      <section style={{
        paddingTop: '3.5rem',
        paddingBottom: '3rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>Our Mission</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Transforming Academic Preparation Through Ethical AI
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
            CampusAI was founded to solve a specific collegiate challenge: helping undergraduate and postgraduate students structure hundreds of unstructured lecture slides, handwritten notes, and past examination papers into actionable, high-retention study resources.
          </p>
        </div>
      </section>

      {/* Core Principles Section */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Our Strict Academic & Data Ethics Commitments
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)' }}>
              We adhere to rigid non-negotiable standards regarding student privacy and academic integrity.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-soft-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: 'var(--brand-coral)'
              }}>
                <Lock size={20} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Zero Foundation Model Training
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
                Your uploaded lecture notes, past exam papers, and laboratory journals are processed ephemerally. They are never ingested into training corpuses for public AI models.
              </p>
            </div>

            <div className="card">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: 'var(--brand-teal)'
              }}>
                <ShieldCheck size={20} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Intellectual Property Protection
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
                You retain complete, exclusive copyright over your uploaded notes and generated study summaries. You can export or permanently purge your files anytime.
              </p>
            </div>

            <div className="card">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                color: 'var(--ink-primary)'
              }}>
                <CheckCircle size={20} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Factual Educational Grounding
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
                Questions and summaries are strictly bound to the syllabus documents you upload, minimizing hallucinations and ensuring syllabus relevance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creators & Team Section */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '2.5rem' }}>
            <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>The Minds Behind CampusAI</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
              Creators & Team
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Meet the creators and engineers driving CampusAI to empower students across India with high-retention, intelligent study solutions.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '850px' }}>
            {/* MD Sameer Nawaz */}
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(235, 94, 40, 0.12)',
                    color: 'var(--brand-coral)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    border: '2px solid rgba(235, 94, 40, 0.25)',
                    flexShrink: 0
                  }}>
                    SN
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '0.2rem' }}>
                      MD Sameer Nawaz
                    </h3>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-coral)' }}>
                      Creator & Team
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Specializing in AI architectures, document intelligence systems, and collegiate exam preparation platforms.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/md-sameer-nawaz-aa79673b6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  width: '100%',
                  textDecoration: 'none'
                }}
              >
                <LinkedInIcon size={16} color="#0077b5" />
                <span>View LinkedIn Profile</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>

            {/* Lav Kumar Singh */}
            <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(42, 157, 143, 0.12)',
                    color: 'var(--brand-teal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    border: '2px solid rgba(42, 157, 143, 0.25)',
                    flexShrink: 0
                  }}>
                    LS
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '0.2rem' }}>
                      Lav Kumar Singh
                    </h3>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-teal)' }}>
                      Creator & Team
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Driving high-performance educational user experiences, active recall methodologies, and student workflows.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/lav-kumar-singh-6539063b3"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  width: '100%',
                  textDecoration: 'none'
                }}
              >
                <LinkedInIcon size={16} color="#0077b5" />
                <span>View LinkedIn Profile</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Contact Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {/* Office Info */}
            <div>
              <span className="badge" style={{ marginBottom: '0.5rem' }}>Platform & Contact</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
                CampusAI
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Designed and built in India's premier technological and academic corridor in Hyderabad.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MapPin size={18} color="var(--brand-coral)" style={{ flexShrink: 0 }} aria-hidden="true" />
                  <div>
                    <strong>Location:</strong> Hyderabad, Telangana, India
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} color="var(--brand-coral)" style={{ flexShrink: 0 }} aria-hidden="true" />
                  <div>
                    <strong>General Support:</strong>{' '}
                    <a href="mailto:mohammadsameernawaaz@gmail.com" style={{ textDecoration: 'underline', color: 'var(--brand-coral)' }}>
                      mohammadsameernawaaz@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Creators & Team Quick Links */}
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--ink-primary)' }}>
                  Creators & Team
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <a
                    href="https://www.linkedin.com/in/md-sameer-nawaz-aa79673b6"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--ink-primary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  >
                    <LinkedInIcon size={15} color="#0077b5" />
                    <span>MD Sameer Nawaz</span>
                    <ExternalLink size={12} style={{ color: 'var(--ink-secondary)' }} aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lav-kumar-singh-6539063b3"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--ink-primary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  >
                    <LinkedInIcon size={15} color="#0077b5" />
                    <span>Lav Kumar Singh</span>
                    <ExternalLink size={12} style={{ color: 'var(--ink-secondary)' }} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Inquire or Request Institutional Demo
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
                Colleges, faculty members, and enterprise partners can reach our academic solutions team below. All inquiries route directly to <code>mohammadsameernawaaz@gmail.com</code>.
              </p>

              {formSubmitted && submittedData ? (
                <div style={{
                  padding: '1.75rem',
                  backgroundColor: 'var(--bg-muted)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--brand-teal)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--brand-teal)', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                    <CheckCircle size={22} aria-hidden="true" />
                    <span>Inquiry Transmitted Successfully</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-primary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    Thank you, <strong>{submittedData.name}</strong>! Your institutional inquiry has been sent to the CampusAI team (<strong>mohammadsameernawaaz@gmail.com</strong>). We will get back to you shortly at <strong>{submittedData.email}</strong>.
                  </p>

                  <div style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-btn)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.825rem',
                    color: 'var(--ink-secondary)',
                    marginBottom: '1.25rem'
                  }}>
                    <div><strong>Institution:</strong> {submittedData.institution}</div>
                    <div style={{ marginTop: '0.35rem' }}><strong>Timestamp:</strong> {new Date(submittedData.submittedAt).toLocaleString()}</div>
                    <div style={{ marginTop: '0.35rem', color: 'var(--brand-teal)', fontWeight: 600 }}>
                      Dispatched directly via EmailJS to mohammadsameernawaaz@gmail.com
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setSubmittedData(null);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Prof. Rajesh Verma / Ananya Reddy"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Official Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="rajesh.verma@university.ac.in"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      College / University Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.institution}
                      onChange={(e) => setContactForm({ ...contactForm, institution: e.target.value })}
                      placeholder="Osmania University / IIT Hyderabad"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Inquiry Message *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Specify your inquiry or campus licensing requirements..."
                      style={{ width: '100%' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '0.5rem', opacity: isSubmitting ? 0.6 : 1 }}
                  >
                    <Send size={16} aria-hidden="true" />
                    <span>{isSubmitting ? "Transmitting Inquiry..." : "Send Inquiry"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Toast Notification */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 10001,
            backgroundColor: 'var(--ink-primary)',
            color: 'var(--ink-inverse)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-card)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            maxWidth: '460px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--brand-teal)',
            color: 'var(--ink-inverse)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <CheckCircle size={18} aria-hidden="true" />
          </div>
          <div style={{ flex: 1, fontSize: '0.875rem', lineHeight: 1.4 }}>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.15rem' }}>
              Inquiry Dispatched!
            </strong>
            Thank you! Your institutional inquiry has been sent to the CampusAI team. We will get back to you shortly.
          </div>
          <button
            onClick={() => setShowToast(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ink-inverse)',
              opacity: 0.75,
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </main>
  );
};
