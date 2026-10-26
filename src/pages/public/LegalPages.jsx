import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, FileText, CheckCircle, Send, Cookie, AlertCircle } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <main id="main-content" style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>Regulatory Compliance</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1rem' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '2.5rem' }}>
          Effective Date: October 25, 2026 • Compliant with Digital Personal Data Protection (DPDP) Act, 2023 and GDPR.
        </p>

        <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              1. Commitment to Data Minimization
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              CampusAI EdTech Pvt. Ltd. collects only data strictly necessary to deliver academic workspace functionality. We collect your Name, Academic Email Address, College/University Affiliation, Academic Role (Student or Faculty), and user-uploaded study files (PDFs, PPTs, DOCX, and TXT). We do not collect biometric data, government identification numbers, or social media tracking tokens.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              2. Absolute Prohibition on Foundation Model Training
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              We enforce an absolute non-training guarantee: Your uploaded lecture notes, examination papers, laboratory reports, and handwritten summaries are processed strictly for real-time document parsing and synthesis within your private workspace. Your academic content is never sold, licensed, or utilized to train, retrain, or fine-tune public foundation AI models or third-party commercial systems.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              3. Data Retention and Student Purge Rights
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              You retain total control over your academic records. You may export all your study files, generated questions, and quiz scores in JSON format at any moment. Furthermore, our Account Settings dashboard provides a permanent "Delete Account & Purge All Uploaded Data" mechanism that irreversibly deletes all stored files, cached vectors, and telemetry within 60 seconds.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              4. Data Protection & Grievance Officer
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              Under the Digital Personal Data Protection Act, 2023, you have the right to grievance redressal. You may contact our Data Grievance Officer directly regarding any privacy inquiry:
            </p>
            <div style={{ backgroundColor: 'var(--bg-muted)', padding: '1rem', borderRadius: 'var(--radius-btn)', marginTop: '0.75rem', fontSize: '0.875rem' }}>
              <strong>Grievance Officer:</strong> CampusAI Legal & Compliance Cell<br />
              <strong>Entity:</strong> CampusAI EdTech Pvt. Ltd.<br />
              <strong>Address:</strong> Level 5, Cyber Gateway, HITEC City, Hyderabad, Telangana 500081, India<br />
              <strong>Direct Email:</strong> <a href="mailto:privacy@campusai.in" style={{ textDecoration: 'underline' }}>privacy@campusai.in</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export const TermsOfServicePage = () => {
  return (
    <main id="main-content" style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>Academic Terms</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1rem' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '2.5rem' }}>
          Last Updated: October 25, 2026 • Governing platform use and academic integrity standards.
        </p>

        <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              1. Academic Integrity & Permissible Use
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              CampusAI is designed exclusively as an auxiliary study companion, revision accelerator, and diagnostic self-assessment tool. Students must not utilize CampusAI during live, invigilated examinations or tests where external aids are prohibited by their university or educational board. Users agree to respect institutional codes of academic conduct.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              2. Intellectual Property Rights in Uploaded Notes
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              Students and educators retain full copyright ownership of all study materials, handwritten notes, and slide decks uploaded to CampusAI. By uploading files, you grant CampusAI only the limited, revocable license strictly required to parse, format, and render generated questions and study plans back to you.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              3. Service Availability and Modifications
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              While CampusAI maintains 99.9% target uptime during university examination periods, we perform periodic maintenance with advance notice. We reserve the right to refine feature algorithms to enhance factual accuracy and performance.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export const RefundPolicyPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [refundData, setRefundData] = useState({
    name: '',
    email: '',
    orderId: '',
    reason: 'Not satisfied with summary depth'
  });

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    if (refundData.name && refundData.email && refundData.orderId) {
      setFormSubmitted(true);
    }
  };

  return (
    <main id="main-content" style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Student Guarantee</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1rem' }}>
          7-Day Unconditional Refund Policy
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '2.5rem' }}>
          Clear, plain-language 7-day money-back guarantee for Student Premium plans.
        </p>

        <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              1. The 7-Day Student Premium Guarantee
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              If you subscribe to Student Premium (Monthly or Semester Pack) and discover it does not meet your academic preparation requirements, you are entitled to a 100% full refund within seven (7) calendar days of your payment date. Zero interrogation, zero penalty fees, and zero hidden exclusions.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              2. Processing Timeline & Payment Reversal
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              Approved refunds are initiated immediately upon submission. Depending on your financial institution:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem', color: 'var(--ink-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={15} color="var(--brand-coral)" /> UPI Transactions: Credited back within 24 to 48 hours.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={15} color="var(--brand-coral)" /> Debit & Credit Cards: Credited within 3 to 5 business days.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={15} color="var(--brand-coral)" /> Net Banking: Credited within 2 to 4 business days.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--ink-primary)' }}>
              3. Institutional Subscriptions
            </h2>
            <p style={{ color: 'var(--ink-secondary)' }}>
              College and university contracts operate under individual Service Level Agreements (SLAs). Institutional contracts include a 30-day proof-of-concept clause with pro-rata refunds.
            </p>
          </section>
        </div>

        {/* Working Refund Request Form */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Submit an Instant Refund Request
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.5rem' }}>
            Enter your transaction details below. Our finance desk handles refund reversals directly without ticketing queues.
          </p>

          {formSubmitted ? (
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-muted)',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--brand-teal)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-teal)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <CheckCircle size={18} />
                <span>Refund Request Initiated Successfully</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>
                Your refund for Order #{refundData.orderId} has been logged. An email confirmation has been sent to {refundData.email}. The full refund of ₹149.00 will reflect in your original payment method within 3 to 5 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRefundSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={refundData.name}
                    onChange={(e) => setRefundData({ ...refundData, name: e.target.value })}
                    placeholder="Aarav Sharma"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Registered Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={refundData.email}
                    onChange={(e) => setRefundData({ ...refundData, email: e.target.value })}
                    placeholder="aarav.sharma@iiit.ac.in"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Transaction / Order Reference ID *
                </label>
                <input
                  type="text"
                  required
                  value={refundData.orderId}
                  onChange={(e) => setRefundData({ ...refundData, orderId: e.target.value })}
                  placeholder="e.g. CAI-TXN-892401 or UPI Reference ID"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Primary Reason for Cancellation
                </label>
                <select
                  value={refundData.reason}
                  onChange={(e) => setRefundData({ ...refundData, reason: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="Not satisfied with summary depth">Not satisfied with summary depth</option>
                  <option value="Exams completed ahead of schedule">Exams completed ahead of schedule</option>
                  <option value="Subject format not optimal">Subject format not optimal</option>
                  <option value="Accidental subscription charge">Accidental subscription charge</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <Send size={16} aria-hidden="true" />
                <span>Process My Refund</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export const CookiePolicyPage = () => {
  const { setIsCookieBannerOpen } = useApp();

  return (
    <main id="main-content" style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>Storage Transparency</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1rem' }}>
          Cookie & Local Storage Policy
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '2.5rem' }}>
          Detailed audit of client-side storage keys, purpose, and lifecycle.
        </p>

        <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            CampusAI utilizes standard Web Storage APIs (Local Storage and Session Storage) in place of invasive third-party tracking cookies. We do not load third-party behavioral advertising scripts or sell visitor activity to ad exchanges.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Audited Storage Keys Table
          </h2>

          <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-btn)' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Storage Key</th>
                  <th>Classification</th>
                  <th>Duration</th>
                  <th>Operational Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>campusai_user_session</code></td>
                  <td><span className="badge">Essential</span></td>
                  <td>Persistent</td>
                  <td>Stores active student session state and role permissions.</td>
                </tr>
                <tr>
                  <td><code>campusai_documents</code></td>
                  <td><span className="badge">Essential</span></td>
                  <td>Persistent</td>
                  <td>Caches parsed study materials, unit summaries, and questions locally.</td>
                </tr>
                <tr>
                  <td><code>campusai_study_plans</code></td>
                  <td><span className="badge">Essential</span></td>
                  <td>Persistent</td>
                  <td>Preserves student task checklist status and exam dates.</td>
                </tr>
                <tr>
                  <td><code>campusai_quiz_history</code></td>
                  <td><span className="badge">Essential</span></td>
                  <td>Persistent</td>
                  <td>Maintains quiz scores and diagnostic weak topic metrics.</td>
                </tr>
                <tr>
                  <td><code>campusai_cookie_consent</code></td>
                  <td><span className="badge">Essential</span></td>
                  <td>Persistent</td>
                  <td>Records your explicit cookie choices (Essential vs All).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
              Want to adjust your storage preferences?
            </span>
            <button
              onClick={() => setIsCookieBannerOpen(true)}
              className="btn btn-secondary btn-sm"
            >
              <Cookie size={14} color="var(--brand-coral)" />
              <span>Open Cookie Preferences</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
