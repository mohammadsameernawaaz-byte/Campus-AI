import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Menu, X, ArrowRight, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';

export const Navbar = () => {
  const { currentPath, navigate, user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Institutions", path: "/#institutions" },
    { name: "About", path: "/about" }
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.replace('/#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(path.replace('/#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(251, 251, 249, 0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textAlign: 'left' }}
          aria-label="CampusAI Home"
        >
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: 'var(--ink-primary)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink-inverse)'
          }}>
            <BookOpen size={20} strokeWidth={2.2} style={{ color: 'var(--brand-coral)' }} aria-hidden="true" />
          </div>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink-primary)' }}>
              Campus<span style={{ color: 'var(--brand-coral)' }}>AI</span>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: 1
            }}>
              Academic Workspace
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              style={{
                fontSize: '0.925rem',
                fontWeight: currentPath === link.path ? 700 : 500,
                color: currentPath === link.path ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                borderBottom: currentPath === link.path ? '2px solid var(--brand-coral)' : '2px solid transparent',
                padding: '0.35rem 0.1rem'
              }}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }} className="desktop-nav">
          {user.isLoggedIn ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-primary"
              aria-label="Open Student Dashboard"
            >
              <LayoutDashboard size={16} aria-hidden="true" />
              <span>Go to Workspace</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="btn btn-secondary"
                aria-label="Sign In to Account"
              >
                <LogIn size={16} aria-hidden="true" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="btn btn-coral"
                aria-label="Create Free Account"
              >
                <UserPlus size={16} aria-hidden="true" />
                <span>Start Free</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          style={{ display: 'none', padding: '0.5rem', color: 'var(--ink-primary)' }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              style={{
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                padding: '0.5rem 0'
              }}
            >
              {link.name}
            </button>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
            {user.isLoggedIn ? (
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <LayoutDashboard size={16} aria-hidden="true" />
                <span>Go to Workspace</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  <LogIn size={16} aria-hidden="true" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}
                  className="btn btn-coral"
                  style={{ width: '100%' }}
                >
                  <UserPlus size={16} aria-hidden="true" />
                  <span>Start Free Workspace</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
