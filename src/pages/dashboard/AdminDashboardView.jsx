import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Award,
  Zap,
  CheckCircle2,
  Calendar,
  Search,
  Download,
  Plus,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const AdminDashboardView = () => {
  const { user, navigate } = useApp();

  // Dynamic Metrics State
  const [totalUsers, setTotalUsers] = useState(4820);
  const [activeLicenses, setActiveLicenses] = useState(4820);
  const [totalLicenses, setTotalLicenses] = useState(5000);
  const [tokensConsumed, setTokensConsumed] = useState('18.42M');
  const [provisionMessage, setProvisionMessage] = useState('');

  // Department Search / Filter State
  const [searchQuery, setSearchQuery] = useState('');

  // Department Activity Table Data
  const [departments, setDepartments] = useState([
    {
      id: 'dept-cse',
      name: 'Computer Science & Engineering (CSE)',
      code: 'CSE',
      head: 'Prof. V. Ramakrishna Rao',
      users: 1420,
      documentsIngested: 2850,
      examsGenerated: 420,
      tokenUsage: '6.24M',
      quotaPercent: 98,
      status: 'Active'
    },
    {
      id: 'dept-ece',
      name: 'Electronics & Communication Engineering (ECE)',
      code: 'ECE',
      head: 'Prof. S. K. Murthy',
      users: 980,
      documentsIngested: 1640,
      examsGenerated: 280,
      tokenUsage: '4.12M',
      quotaPercent: 94,
      status: 'Active'
    },
    {
      id: 'dept-it',
      name: 'Information Technology (IT)',
      code: 'IT',
      head: 'Dr. P. Ananya Reddy',
      users: 860,
      documentsIngested: 1420,
      examsGenerated: 240,
      tokenUsage: '3.78M',
      quotaPercent: 96,
      status: 'Active'
    },
    {
      id: 'dept-me',
      name: 'Mechanical Engineering (ME)',
      code: 'ME',
      head: 'Dr. K. Ramanathan',
      users: 640,
      documentsIngested: 910,
      examsGenerated: 160,
      tokenUsage: '2.14M',
      quotaPercent: 88,
      status: 'Active'
    },
    {
      id: 'dept-eee',
      name: 'Electrical & Electronics Engineering (EEE)',
      code: 'EEE',
      head: 'Prof. M. B. Goud',
      users: 520,
      documentsIngested: 780,
      examsGenerated: 140,
      tokenUsage: '1.38M',
      quotaPercent: 85,
      status: 'Active'
    },
    {
      id: 'dept-mba',
      name: 'School of Management Studies (MBA)',
      code: 'MBA',
      head: 'Dr. Nandini Sengupta',
      users: 400,
      documentsIngested: 620,
      examsGenerated: 110,
      tokenUsage: '0.76M',
      quotaPercent: 80,
      status: 'Active'
    }
  ]);

  const [currentDate] = useState(() => new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Provision additional licenses action
  const handleProvisionMoreSeats = () => {
    setTotalLicenses(prev => prev + 500);
    setProvisionMessage('Successfully provisioned 500 additional enterprise student licenses! Total pool is now ' + (totalLicenses + 500) + ' seats.');
    setTimeout(() => setProvisionMessage(''), 6000);
  };

  // CSV Export for Department Activity
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Department Code,Department Name,Department Head,Enrolled Users,Materials Ingested,Exams Generated,Token Consumption,Quota Allocation\n';

    departments.forEach(d => {
      csvContent += `"${d.code}","${d.name}","${d.head}",${d.users},${d.documentsIngested},${d.examsGenerated},"${d.tokenUsage}","${d.quotaPercent}%"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `campusai_department_activity_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter departments by query
  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.head.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Greeting & Live Date Badge */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-coral" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
              Admin Analytics View
            </span>
            <span className="badge" style={{ fontSize: '0.75rem' }}>
              Institutional Governance
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--ink-primary)', letterSpacing: '-0.02em' }}>
            Institutional Administration & Governance Oversight
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
            Enterprise Campus License Allocation, Compute Telemetry & Multi-Departmental Audit • {user?.college || 'CampusAI Enterprise'}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
            <Calendar size={14} color="var(--brand-coral)" style={{ marginRight: '0.25rem' }} />
            {currentDate}
          </span>
        </div>
      </div>

      {/* 2. Four Live Institutional Metric Cards (Total Campus Users, Active Licenses, API Token Consumption, etc.) */}
      <div className="grid-4">
        {/* Metric 1: Total Campus Users */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Total Campus Users
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-coral)' }}>
              <Users size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            {totalUsers.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            3,940 Students • 480 Faculty • 400 Staff
          </div>
        </div>

        {/* Metric 2: Active Licenses */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Active Licenses
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-teal)' }}>
              <Award size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            {activeLicenses.toLocaleString()} <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--ink-muted)' }}>/ {totalLicenses.toLocaleString()}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--brand-teal)', fontWeight: 600, marginTop: '0.25rem' }}>
            {((activeLicenses / totalLicenses) * 100).toFixed(1)}% allocated ({totalLicenses - activeLicenses} seats free)
          </div>
        </div>

        {/* Metric 3: API Token Consumption */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              API Token Consumption
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-coral)' }}>
              <Zap size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-coral)' }}>
            {tokensConsumed}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            73.7% of 25.0M Monthly Quota
          </div>
        </div>

        {/* Metric 4: Compliance & Privacy Score */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Compliance & Privacy
            </span>
            <div style={{ padding: '0.35rem', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', color: 'var(--brand-teal)' }}>
              <ShieldCheck size={18} aria-hidden="true" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-teal)' }}>
            100% Verified
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
            Zero Model Training • DPDP & FERPA
          </div>
        </div>
      </div>

      {provisionMessage && (
        <div style={{
          padding: '0.85rem 1rem',
          backgroundColor: 'var(--bg-teal-subtle)',
          color: 'var(--brand-teal)',
          borderRadius: 'var(--radius-btn)',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={16} />
          <span>{provisionMessage}</span>
        </div>
      )}

      {/* 3. Resource Quota Telemetry Gauges */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--ink-primary)' }}>
          Institutional Resource Allocation & Inference Telemetry
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Gauge 1: Monthly Token Quota */}
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <strong>API Token Quota (Monthly Cycle)</strong>
              <span style={{ fontWeight: 800, color: 'var(--brand-coral)' }}>73.7%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '73.7%', height: '100%', backgroundColor: 'var(--brand-coral)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
              <span>18,421,900 tokens consumed</span>
              <span>6,578,100 tokens remaining</span>
            </div>
          </div>

          {/* Gauge 2: Seat License Allocation */}
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <strong>Enterprise Seat Utilization</strong>
              <span style={{ fontWeight: 800, color: 'var(--brand-teal)' }}>96.4%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '96.4%', height: '100%', backgroundColor: 'var(--brand-teal)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
              <span>{activeLicenses.toLocaleString()} active user seats</span>
              <span>{(totalLicenses - activeLicenses).toLocaleString()} unallocated seats</span>
            </div>
          </div>

          {/* Gauge 3: Ingested Course Cache Storage */}
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <strong>Ephemeral Document Parsing Cache</strong>
              <span style={{ fontWeight: 800, color: 'var(--ink-primary)' }}>42.8%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '42.8%', height: '100%', backgroundColor: 'var(--ink-primary)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
              <span>42.8 GB / 100.0 GB Institutional Tier</span>
              <span>Auto-purged after 90 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Department Activity Table (Requested explicitly) */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
              Department Activity & Resource Consumption Table
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--ink-muted)' }}>
              Live telemetry monitoring across engineering, science, and management academic departments.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter departments..."
                style={{
                  width: '100%',
                  padding: '0.4rem 0.65rem 0.4rem 2rem',
                  fontSize: '0.825rem',
                  borderRadius: 'var(--radius-btn)'
                }}
              />
            </div>

            {/* CSV Export Button */}
            <button
              onClick={handleExportCSV}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              title="Export Table as CSV"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>

            {/* Allocate 500 Seats Button */}
            <button
              onClick={handleProvisionMoreSeats}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Plus size={14} />
              <span>Allocate +500 Seats</span>
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Department & Code</th>
                <th>Department Head</th>
                <th>Enrolled Users</th>
                <th>Materials Ingested</th>
                <th>Exams Generated</th>
                <th>Token Consumption</th>
                <th>Quota Allocation</th>
                <th style={{ textAlign: 'right' }}>Governance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--ink-muted)' }}>
                    No matching department found for "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredDepartments.map((dept) => (
                  <tr key={dept.id}>
                    <td>
                      <div>
                        <strong style={{ fontSize: '0.875rem' }}>{dept.name}</strong>
                        <div style={{ fontSize: '0.725rem', color: 'var(--ink-muted)' }}>Code: {dept.code}</div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem', color: 'var(--ink-primary)' }}>{dept.head}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{dept.users.toLocaleString()}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem', color: 'var(--ink-secondary)' }}>{dept.documentsIngested.toLocaleString()} files</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: '0.825rem', color: 'var(--brand-coral)' }}>{dept.examsGenerated} papers</span>
                    </td>
                    <td>
                      <span className="font-mono" style={{ fontSize: '0.8rem' }}>{dept.tokenUsage}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${dept.quotaPercent}%`, height: '100%', backgroundColor: dept.quotaPercent > 95 ? 'var(--brand-coral)' : 'var(--brand-teal)' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{dept.quotaPercent}%</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                        {dept.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Institutional Security & Audit Trail */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              Live Security, Audit & Retention Telemetry
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              Real-time verified compliance checkpoints ensuring absolute student confidentiality.
            </p>
          </div>
          <span className="badge badge-teal">DPDP Compliant Feed</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="var(--brand-teal)" />
              <span><strong>AUDIT_ENFORCE:</strong> Zero public model training flag actively verified across all 4,820 accounts.</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Today at 19:42:10</span>
          </div>

          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="var(--brand-teal)" />
              <span><strong>BLUEPRINT_SYNC:</strong> JNTUH R22, Anna University 2021, and VTU 2022 regulation blueprints synchronized.</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Today at 18:15:22</span>
          </div>

          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-btn)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="var(--brand-teal)" />
              <span><strong>SSO_CHECK:</strong> University SAML 2.0 Identity Gateway functioning normally with 0 auth anomalies.</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Today at 16:30:05</span>
          </div>
        </div>
      </div>

      {/* 6. Admin Quick Actions Grid */}
      <div className="grid-4">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Award size={16} color="var(--brand-coral)" />
              <strong style={{ fontSize: '0.95rem' }}>Provision Licenses</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Allocate enterprise seats across departments.
            </p>
          </div>
          <button
            onClick={handleProvisionMoreSeats}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>Allocate +500 Seats</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <FileText size={16} color="var(--brand-teal)" />
              <strong style={{ fontSize: '0.95rem' }}>Audit Telemetry</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Download compliance report for NAAC accreditation.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>Download CSV Report</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Zap size={16} color="var(--brand-coral)" />
              <strong style={{ fontSize: '0.95rem' }}>API Quota Calibration</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Configure token throttle limits per academic tier.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/settings')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>Configure Quotas</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--brand-teal)" />
              <strong style={{ fontSize: '0.95rem' }}>SSO & Security</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
              Manage Shibboleth, SAML & Active Directory sync.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/settings')}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <span>Security Settings</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
