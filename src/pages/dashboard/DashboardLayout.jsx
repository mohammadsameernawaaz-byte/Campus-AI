import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  UploadCloud,
  FileText,
  HelpCircle,
  Award,
  BookOpen,
  Layers,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';
import { AssistantSlideDrawer } from '../../components/common/AssistantSlideDrawer';

export const DashboardLayout = ({ children }) => {
  const {
    currentPath,
    navigate,
    user,
    setUser,
    notifications,
    markAllNotificationsAsRead,
    dismissNotification,
    setIsGlobalSearchOpen,
    isAssistantDrawerOpen,
    setIsAssistantDrawerOpen
  } = useApp();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navigationSections = [
    {
      title: "Workspace",
      items: [
        { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
        { name: "AI Study Assistant", path: "/dashboard/chat", icon: MessageSquare },
        { name: "Upload Materials", path: "/dashboard/upload", icon: UploadCloud }
      ]
    },
    {
      title: "Study Tools",
      items: [
        { name: "Summaries", path: "/dashboard/summaries", icon: FileText },
        { name: "Important Questions", path: "/dashboard/questions", icon: HelpCircle },
        { name: "Quizzes", path: "/dashboard/quizzes", icon: Award },
        { name: "Viva Questions", path: "/dashboard/viva", icon: BookOpen },
        { name: "Flashcards", path: "/dashboard/flashcards", icon: Layers },
        { name: "Study Plan", path: "/dashboard/study-plan", icon: Calendar }
      ]
    },
    {
      title: "Analytics & System",
      items: [
        { name: "Progress", path: "/dashboard/progress", icon: BarChart3 },
        { name: "Settings", path: "/dashboard/settings", icon: Settings }
      ]
    }
  ];

  const unreadNotificationsCount = Array.isArray(notifications) ? notifications.filter(n => !n.read).length : 0;

  const handleRoleSwitch = (newRole) => {
    setUser(prev => ({ ...(prev || {}), role: newRole }));
    setProfileDropdownOpen(false);
    navigate('/dashboard');
  };

  const handleSignOut = () => {
    setUser(prev => ({ ...(prev || {}), isLoggedIn: false }));
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(21, 21, 21, 0.5)',
            zIndex: 900
          }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Persistent Left Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 950,
          flexShrink: 0
        }}
        className={`dashboard-sidebar ${mobileSidebarOpen ? 'sidebar-open' : ''}`}
      >
        {/* Sidebar Brand Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textAlign: 'left' }}
            aria-label="CampusAI Home"
          >
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--ink-primary)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-coral)'
            }}>
              <BookOpen size={18} strokeWidth={2.4} aria-hidden="true" />
            </div>
            <div>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-primary)' }}>
                Campus<span style={{ color: 'var(--brand-coral)' }}>AI</span>
              </span>
              <span style={{
                display: 'block',
                fontSize: '0.65rem',
                color: 'var(--ink-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {(user?.role || 'Student')} Workspace
              </span>
            </div>
          </button>

          <button
            className="mobile-close-sidebar"
            onClick={() => setMobileSidebarOpen(false)}
            style={{ display: 'none', color: 'var(--ink-secondary)' }}
            aria-label="Close sidebar"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Semantic Grouped Navigation */}
        <nav
          style={{
            flex: 1,
            padding: '1.25rem 0.75rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}
          aria-label="Sidebar Navigation"
        >
          {navigationSections.map((section) => (
            <div key={section.title}>
              <div
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: '#8A8A8A',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '0 0.75rem',
                  marginBottom: '0.45rem'
                }}
              >
                {section.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        setMobileSidebarOpen(false);
                        navigate(item.path);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 500,
                        backgroundColor: isActive ? '#151515' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#4A4A4A',
                        textAlign: 'left',
                        width: '100%',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease, color 0.15s ease'
                      }}
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                    >
                      <Icon
                        size={17}
                        aria-hidden="true"
                        style={{
                          color: isActive ? '#FFFFFF' : 'currentColor',
                          flexShrink: 0
                        }}
                      />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sleek Minimalist User Badge Footer */}
        <div
          style={{
            padding: '0.85rem 0.85rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <button
            onClick={() => {
              setMobileSidebarOpen(false);
              navigate('/dashboard/settings');
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0.6rem',
              borderRadius: '6px',
              textAlign: 'left',
              transition: 'background-color 0.15s ease',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 'none'
            }}
            className="sidebar-user-badge"
            title="Account & Plan Settings"
            aria-label="Account & Plan Settings"
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#F4F1EA',
                color: '#151515',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem',
                flexShrink: 0,
                border: '1px solid rgba(21, 21, 21, 0.08)'
              }}
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ST'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: '#151515',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {user?.name || 'Student Account'}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: '#767676',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>{user?.plan || 'Student'}</span>
                <span>•</span>
                <span>Settings</span>
              </div>
            </div>
            <Settings size={15} style={{ color: '#8A8A8A', flexShrink: 0 }} aria-hidden="true" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header style={{
          height: '65px',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          zIndex: 800
        }}>
          {/* Mobile hamburger & Global Search Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, maxWidth: '520px' }}>
            <button
              className="mobile-sidebar-toggle"
              onClick={() => setMobileSidebarOpen(true)}
              style={{ display: 'none', color: 'var(--ink-primary)', padding: '0.35rem' }}
              aria-label="Open sidebar menu"
            >
              <Menu size={22} aria-hidden="true" />
            </button>

            <button
              onClick={() => setIsGlobalSearchOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'var(--bg-muted)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-btn)',
                padding: '0.5rem 0.85rem',
                fontSize: '0.85rem',
                color: 'var(--ink-muted)',
                width: '100%',
                cursor: 'pointer',
                textAlign: 'left'
              }}
              aria-label="Open global search (Shortcut Ctrl+K or /)"
            >
              <Search size={16} aria-hidden="true" />
              <span style={{ flex: 1 }}>Search uploaded notes, summaries, or questions...</span>
              <span className="badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.35rem' }}>Ctrl+K</span>
            </button>
          </div>

          {/* Right Utilities: Ask CampusAI, Notifications & Profile Role Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Global Quick-Ask Slide-Over Drawer Trigger */}
            <button
              onClick={() => setIsAssistantDrawerOpen(prev => !prev)}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.75rem',
                fontSize: '0.825rem',
                fontWeight: 700,
                border: '1.5px solid var(--ink-primary)',
                color: 'var(--ink-primary)',
                backgroundColor: isAssistantDrawerOpen ? 'var(--bg-muted)' : 'var(--bg-surface)'
              }}
              title="Open AI Study Assistant Drawer (Shortcut Ctrl+J)"
              aria-label="Open AI Study Assistant Drawer"
            >
              <Sparkles size={15} color="var(--brand-coral)" />
              <span>Ask CampusAI</span>
              <span className="badge" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
                Ctrl+J
              </span>
            </button>

            {/* Notification Bell Popover */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setNotificationOpen(prev => !prev);
                  setProfileDropdownOpen(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{ position: 'relative', padding: '0.55rem' }}
                aria-label={`Notifications (${unreadNotificationsCount} unread)`}
                aria-expanded={notificationOpen}
              >
                <Bell size={18} aria-hidden="true" />
                {unreadNotificationsCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: 'var(--brand-coral)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    width: '18px',
                    height: '18px',
                    borderRadius: '9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Panel */}
              {notificationOpen && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '340px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-card)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <strong style={{ fontSize: '0.85rem' }}>Notifications</strong>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        style={{ fontSize: '0.75rem', color: 'var(--brand-coral)', fontWeight: 600, textDecoration: 'underline' }}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '0.5rem' }}>
                    {(!notifications || notifications.length === 0) ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                        No notifications.
                      </div>
                    ) : (
                      (notifications || []).map(n => (
                        <div
                          key={n.id}
                          style={{
                            padding: '0.65rem 0.75rem',
                            borderRadius: 'var(--radius-btn)',
                            backgroundColor: n.read ? 'transparent' : 'var(--bg-muted)',
                            marginBottom: '0.35rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '0.5rem'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--ink-primary)' }}>
                              {n.title}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', marginTop: '0.15rem', lineHeight: 1.4 }}>
                              {n.message}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>{n.time}</span>
                          </div>
                          <button
                            onClick={() => dismissNotification(n.id)}
                            style={{ color: 'var(--ink-muted)', padding: '0.2rem' }}
                            title="Dismiss"
                            aria-label="Dismiss notification"
                          >
                            <X size={14} aria-hidden="true" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile & Role Switcher Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setProfileDropdownOpen(prev => !prev);
                  setNotificationOpen(false);
                }}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.75rem' }}
                aria-label="User Profile and Role Switcher"
                aria-expanded={profileDropdownOpen}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--ink-primary)',
                  color: 'var(--ink-inverse)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {user?.name ? user.name.charAt(0) : 'U'}
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }} className="user-name-label">
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1 }}>{user?.name || 'Student'}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', lineHeight: 1, marginTop: '2px' }}>{user?.role || 'Student'}</span>
                </div>
                <ChevronDown size={14} color="var(--ink-muted)" aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '260px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-card)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 1000,
                  padding: '0.5rem'
                }}>
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{user?.name || 'Student'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{user?.email || 'student@campus.edu'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--brand-teal)', marginTop: '2px' }}>{user?.college || 'Academic Workspace'}</div>
                  </div>

                  <div style={{ padding: '0.35rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                    Switch Active View
                  </div>
                  {['Student View', 'Faculty Assessment Builder View', 'Admin Analytics View'].map(roleItem => {
                    const cleanRole = roleItem.replace(' View', '').replace(' Assessment Builder', '').replace(' Analytics', '');
                    const isSelected = (user?.role || '').toLowerCase() === cleanRole.toLowerCase();
                    return (
                      <button
                        key={roleItem}
                        onClick={() => handleRoleSwitch(cleanRole)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? 700 : 500,
                          backgroundColor: isSelected ? 'var(--bg-muted)' : 'transparent',
                          borderRadius: 'var(--radius-btn)',
                          textAlign: 'left'
                        }}
                      >
                        <span>{roleItem}</span>
                        {isSelected && <CheckCircle2 size={14} color="var(--brand-coral)" />}
                      </button>
                    );
                  })}

                  <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/dashboard/settings');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.8rem',
                        textAlign: 'left'
                      }}
                    >
                      <Settings size={15} />
                      <span>Account Settings</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.8rem',
                        color: 'var(--brand-coral)',
                        textAlign: 'left'
                      }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* View Content Body */}
        <div style={{ flex: 1, padding: '1.75rem', overflowY: 'auto' }}>
          {children}
        </div>
      </div>

      {/* Global Quick-Ask Slide-Over AI Assistant Drawer */}
      <AssistantSlideDrawer />

      <style>{`
        @media (max-width: 900px) {
          .dashboard-sidebar {
            position: fixed !important;
            left: -280px;
            transition: left 0.2s ease;
          }
          .dashboard-sidebar.sidebar-open {
            left: 0 !important;
          }
          .mobile-sidebar-toggle {
            display: block !important;
          }
          .mobile-close-sidebar {
            display: block !important;
          }
          .user-name-label {
            display: none !important;
          }
        }
        .sidebar-nav-item {
          color: #4A4A4A;
          background-color: transparent;
          border-radius: 6px;
        }
        .sidebar-nav-item:hover:not(.active) {
          background-color: #F4F1EA !important;
          color: #151515 !important;
        }
        .sidebar-nav-item.active {
          background-color: #151515 !important;
          color: #FFFFFF !important;
        }
        .sidebar-user-badge:hover {
          background-color: #F4F1EA !important;
        }
      `}</style>
    </div>
  );
};
