import React, { useState } from 'react';
import { Menu, X, Bell, Mail, LogOut, Search, ChevronDown } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHome         from './pages/AdminHome';
import AdminControlPanel from './pages/AdminControlPanel';
import AdminAdmission    from './pages/AdminAdmission';
import AdminPayment      from './pages/AdminPayment';

const BRAND = 'rgb(74, 0, 74)';

const PAGE_TITLES = {
  'dashboard':     { title: 'Dashboard',      sub: 'Overview & analytics at a glance' },
  'control-panel': { title: 'Control Panel',   sub: 'Administrative tools & system management' },
  'admission':     { title: 'Admission',       sub: 'Student records & admission data' },
  'payment':       { title: 'Payment',         sub: 'Transaction history & fee management' },
};

export default function AdminDashboard({ adminUser, onLogout }) {
  const [activePage, setActivePage]   = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initials = adminUser?.name
    ? adminUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'DA';

  const pageInfo = PAGE_TITLES[activePage] || PAGE_TITLES['dashboard'];

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':     return <AdminHome adminUser={adminUser} onNavigatePage={setActivePage} />;
      case 'control-panel': return <AdminControlPanel />;
      case 'admission':     return <AdminAdmission />;
      case 'payment':       return <AdminPayment />;
      default:              return <AdminHome adminUser={adminUser} onNavigatePage={setActivePage} />;
    }
  };

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#f1f3f8',
      fontFamily: 'var(--font-body, Inter, sans-serif)',
    }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(10, 0, 20, 0.55)',
            backdropFilter: 'blur(4px)',
            zIndex: 200,
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <div onClick={e => e.stopPropagation()} style={{ height: '100%' }}>
            <AdminSidebar
              activePage={activePage}
              setActivePage={(page) => { setActivePage(page); setSidebarOpen(false); }}
              adminUser={adminUser}
              onLogout={onLogout}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <AdminSidebar
        activePage={activePage}
        setActivePage={(page) => { setActivePage(page); setSidebarOpen(false); }}
        adminUser={adminUser}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* ── Premium Top Bar ── */}
        <header style={{
          background: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '0 2rem',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: BRAND, color: '#fff', border: 'none',
              borderRadius: '9px', padding: '0.45rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(74,0,74,0.25)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(74,0,74,0.45)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(74,0,74,0.25)'}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Page title */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e0538', margin: 0, letterSpacing: '-0.01em' }}>
              {pageInfo.title}
            </h1>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
              {pageInfo.sub}
            </p>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem' }} />
            <input
              type="text"
              placeholder="Search anything…"
              style={{
                paddingLeft: '2.2rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem',
                border: '1.5px solid #e8ecf2', borderRadius: '10px',
                background: '#f8f9fc', fontSize: '0.82rem', fontWeight: 500, color: '#1e293b',
                outline: 'none', fontFamily: 'inherit', width: 200,
                transition: 'all 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = '0 0 0 3px rgba(74,0,74,0.1)'; e.target.style.width = '260px'; }}
              onBlur={e => { e.target.style.borderColor = '#e8ecf2'; e.target.style.boxShadow = 'none'; e.target.style.width = '200px'; }}
            />
          </div>

          {/* Notifications */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              position: 'relative', cursor: 'pointer',
              width: 40, height: 40, borderRadius: '11px',
              background: '#f8f9fc', border: '1px solid #e8ecf2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,0,74,0.06)'; e.currentTarget.style.borderColor = 'rgba(74,0,74,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fc'; e.currentTarget.style.borderColor = '#e8ecf2'; }}
            >
              <Bell size={17} color="#64748b" />
              <span style={{
                position: 'absolute', top: -4, right: -4,
                width: 18, height: 18, borderRadius: '50%',
                background: '#ef4444', color: '#fff',
                fontSize: '0.62rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(239,68,68,0.35)',
              }}>7</span>
            </div>

            <div style={{
              position: 'relative', cursor: 'pointer',
              width: 40, height: 40, borderRadius: '11px',
              background: '#f8f9fc', border: '1px solid #e8ecf2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,0,74,0.06)'; e.currentTarget.style.borderColor = 'rgba(74,0,74,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fc'; e.currentTarget.style.borderColor = '#e8ecf2'; }}
            >
              <Mail size={17} color="#64748b" />
              <span style={{
                position: 'absolute', top: -4, right: -4,
                width: 18, height: 18, borderRadius: '50%',
                background: '#f97316', color: '#fff',
                fontSize: '0.62rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(249,115,22,0.35)',
              }}>16</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 32, background: '#e8ecf2' }} />

          {/* Admin avatar + dropdown */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            cursor: 'pointer', padding: '0.3rem 0.5rem', borderRadius: '10px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8f9fc'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              width: 36, height: 36, borderRadius: '10px',
              background: `linear-gradient(135deg, ${BRAND} 0%, rgb(120, 0, 120) 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.78rem', fontWeight: 800, color: '#fff',
              boxShadow: '0 2px 8px rgba(74,0,74,0.25)',
            }}>{initials}</div>
            <div style={{ lineHeight: 1.2 }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                {(adminUser?.name || 'David Anibe Daniel').split(' ').slice(0, 2).join(' ')}
              </p>
              <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
                {adminUser?.role || 'Super Admin'}
              </p>
            </div>
            <ChevronDown size={13} color="#94a3b8" />
          </div>

          {/* Log out */}
          <button
            onClick={onLogout}
            style={{
              background: 'none', border: '1.5px solid #e8ecf2', borderRadius: '9px',
              cursor: 'pointer', color: '#64748b', padding: '0.45rem 0.85rem',
              fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = '#fef2f2'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8ecf2'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'none'; }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </header>

        {/* ── Page Content ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem 2rem' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
