import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, X, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const PricingPage = () => {
  const { navigate } = useApp();
  const [selectedPlanTier, setSelectedPlanTier] = useState('monthly'); // 'monthly' | 'semester'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: "Can I cancel my Student Premium subscription at any time?",
      a: "Yes. You can cancel your subscription with a single click from your Account Settings page at any time. Your access will remain active until the end of your prepaid billing period, with zero cancellation fees."
    },
    {
      q: "How does the 7-day money-back guarantee operate?",
      a: "If you are not completely satisfied with CampusAI within 7 days of subscribing to Student Premium, submit a refund request through our Refund Policy page. We process full refunds within 3 to 5 business days without mandatory interrogation."
    },
    {
      q: "Is GST included in the displayed pricing?",
      a: "Yes. The prices displayed (₹149/month or ₹99/month semester pack) are inclusive of applicable 18% Goods and Services Tax (GST). An itemized GST tax invoice is automatically generated and downloadable upon payment."
    },
    {
      q: "Are my uploaded course notes private and secure?",
      a: "Yes. Your uploaded lecture notes, PPTs, and examination papers are strictly private to your workspace. We never use student uploads to train foundation or public AI models, and you retain full intellectual property ownership of your files."
    },
    {
      q: "What payment methods are supported for Indian and international students?",
      a: "We support UPI (Google Pay, PhonePe, Paytm, BHIM), Indian RuPay/Visa/MasterCard debit and credit cards, Net Banking across all major banks, and international cards via secure PCI-DSS Level 1 compliant gateways."
    }
  ];

  return (
    <main id="main-content" style={{ paddingBottom: '5rem' }}>
      {/* Page Header */}
      <section style={{
        paddingTop: '3.5rem',
        paddingBottom: '3rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Transparent Pricing</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Predictable Academic Investment With Zero Hidden Costs
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
            Every subscription includes all core tools, full mobile responsiveness, verified exam blueprints, and an unconditional 7-day refund guarantee.
          </p>

          {/* Tier Switcher */}
          <div style={{
            display: 'inline-flex',
            padding: '0.35rem',
            backgroundColor: 'var(--bg-muted)',
            borderRadius: 'var(--radius-btn)',
            border: '1px solid var(--border-subtle)',
            marginTop: '1.75rem'
          }}>
            <button
              onClick={() => setSelectedPlanTier('monthly')}
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: selectedPlanTier === 'monthly' ? 700 : 500,
                backgroundColor: selectedPlanTier === 'monthly' ? 'var(--bg-surface)' : 'transparent',
                color: selectedPlanTier === 'monthly' ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                borderRadius: 'var(--radius-btn)'
              }}
            >
              Monthly Flex (₹149/mo)
            </button>
            <button
              onClick={() => setSelectedPlanTier('semester')}
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: selectedPlanTier === 'semester' ? 700 : 500,
                backgroundColor: selectedPlanTier === 'semester' ? 'var(--bg-surface)' : 'transparent',
                color: selectedPlanTier === 'semester' ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                borderRadius: 'var(--radius-btn)'
              }}
            >
              Semester Pack (₹99/mo: Save 33%)
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
            Comprehensive Feature Comparison
          </h2>

          <div style={{
            overflowX: 'auto',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-card)',
            backgroundColor: 'var(--bg-surface)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Feature / Capability</th>
                  <th style={{ width: '20%', textAlign: 'center' }}>Free Plan (₹0)</th>
                  <th style={{ width: '20%', textAlign: 'center', backgroundColor: 'var(--bg-soft-accent)', color: 'var(--brand-coral)' }}>
                    Student Premium
                  </th>
                  <th style={{ width: '20%', textAlign: 'center' }}>College / Institution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>File Upload Allowance</strong></td>
                  <td style={{ textAlign: 'center' }}>Up to 10MB per file</td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>Up to 10MB per file</td>
                  <td style={{ textAlign: 'center' }}>Custom (up to 50MB)</td>
                </tr>
                <tr>
                  <td><strong>Document Summaries</strong></td>
                  <td style={{ textAlign: 'center' }}>Brief depth only</td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>All 3 depths (Brief, Detailed, Exam Cram)</td>
                  <td style={{ textAlign: 'center' }}>All 3 depths + Custom</td>
                </tr>
                <tr>
                  <td><strong>2-Mark and 10-Mark Exam Questions</strong></td>
                  <td style={{ textAlign: 'center' }}>5 sets per month</td>
                  <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--brand-coral)' }}>Unlimited generation</td>
                  <td style={{ textAlign: 'center' }}>Unlimited + Faculty Bank</td>
                </tr>
                <tr>
                  <td><strong>Model Answers with Explanations</strong></td>
                  <td style={{ textAlign: 'center' }}>Basic outlines</td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>Full point-by-point keys</td>
                  <td style={{ textAlign: 'center' }}>Full point-by-point keys</td>
                </tr>
                <tr>
                  <td><strong>Interactive Quizzes with Timer</strong></td>
                  <td style={{ textAlign: 'center' }}>3 quizzes per month</td>
                  <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--brand-coral)' }}>Unlimited quizzes</td>
                  <td style={{ textAlign: 'center' }}>Unlimited + Class Assigner</td>
                </tr>
                <tr>
                  <td><strong>Oral Viva Voce Simulator</strong></td>
                  <td style={{ textAlign: 'center' }}><X size={16} color="var(--ink-muted)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}><Check size={18} color="var(--brand-coral)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center' }}><Check size={18} color="var(--brand-teal)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr>
                  <td><strong>Active Recall Flashcards</strong></td>
                  <td style={{ textAlign: 'center' }}><X size={16} color="var(--ink-muted)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}><Check size={18} color="var(--brand-coral)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center' }}><Check size={18} color="var(--brand-teal)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr>
                  <td><strong>Exam Countdown Study Scheduler</strong></td>
                  <td style={{ textAlign: 'center' }}>1 active plan</td>
                  <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--brand-coral)' }}>Unlimited active plans</td>
                  <td style={{ textAlign: 'center' }}>Campus-wide syllabus schedule</td>
                </tr>
                <tr>
                  <td><strong>Institutional Faculty Admin Portal</strong></td>
                  <td style={{ textAlign: 'center' }}><X size={16} color="var(--ink-muted)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center' }}><X size={16} color="var(--ink-muted)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center' }}><Check size={18} color="var(--brand-teal)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr>
                  <td><strong>Data Export (JSON & Markdown)</strong></td>
                  <td style={{ textAlign: 'center' }}><Check size={16} color="var(--ink-primary)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}><Check size={18} color="var(--brand-coral)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ textAlign: 'center' }}><Check size={18} color="var(--brand-teal)" style={{ margin: '0 auto' }} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Transparent GST & Billing Breakdown Box */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="card" style={{ backgroundColor: 'var(--bg-muted)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="var(--brand-teal)" />
              <span>Transparent GST & Invoice Breakdown (No Hidden Fees)</span>
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
              We do not add hidden convenience charges, payment processing fees, or pre-checked insurance add-ons. Here is the exact calculation:
            </p>

            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-btn)', border: '1px solid var(--border-subtle)', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span>Student Premium Base Price:</span>
                <span className="font-mono">₹126.27</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span>Applicable GST (18% under HSN/SAC 998431 Online Education):</span>
                <span className="font-mono">₹22.73</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0 0', fontWeight: 800, color: 'var(--ink-primary)' }}>
                <span>Total Amount Charged to Student:</span>
                <span className="font-mono" style={{ color: 'var(--brand-coral)' }}>₹149.00 / month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>
            Frequently Asked Billing & Product Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="card" style={{ padding: '1.25rem' }}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'var(--ink-primary)'
                    }}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--brand-coral)" /> : <ChevronDown size={18} color="var(--ink-secondary)" />}
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6, borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
