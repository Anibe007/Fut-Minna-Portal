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

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showMailMenu, setShowMailMenu] = useState(false);

  const notificationsList = [
    { id: 1, title: 'New Payment Received', desc: 'Abubakar Musa paid ₦150,000 for School Fees', time: '5m ago', unread: true },
    { id: 2, title: 'Post-UTME Submission', desc: 'Fatima Aliyu submitted screening documents', time: '22m ago', unread: true },
    { id: 3, title: 'System Backup Complete', desc: 'Database automated snapshot created', time: '1h ago', unread: false },
    { id: 4, title: 'Admission Verification', desc: '14 new candidates verified on JAMB CAPS', time: '3h ago', unread: false },
  ];

  const messagesList = [
    { id: 1, sender: 'Prof. Abdullahi M.', subject: 'Senate Approval List', snippet: 'Please review the updated 2026 admission list...', time: '10m ago' },
    { id: 2, sender: 'ICT Helpdesk', subject: 'Remita Gateway Sync', snippet: 'All RRR logs successfully reconciled for today.', time: '45m ago' },
    { id: 3, sender: 'Bursary Dept', subject: 'Fee Waiver Requests', snippet: '3 requests submitted for Vice Chancellor review.', time: '2h ago' },
  ];

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
            zIndex: 300,
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <div onClick={e => e.stopPropagation()} style={{ height: '100%', width: 260 }}>
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
      <div className="admin-desktop-sidebar">
        <AdminSidebar
          activePage={activePage}
          setActivePage={(page) => { setActivePage(page); setSidebarOpen(false); }}
          adminUser={adminUser}
          onLogout={onLogout}
        />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* ── Premium Top Bar ── */}
        <header className="admin-dashboard-header" style={{
          background: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '0 1.25rem',
          minHeight: 68,
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
          flexShrink: 0,
          position: 'relative',
          zIndex: 100,
          flexWrap: 'wrap',
        }}>
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="admin-hamburger-btn"
            style={{
              background: BRAND, color: '#fff', border: 'none',
              borderRadius: '9px', padding: '0.5rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(74,0,74,0.25)',
              transition: 'all 0.2s',
            }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Page title */}
          <div style={{ flex: 1, minWidth: 140 }}>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e0538', margin: 0, letterSpacing: '-0.01em' }}>
              {pageInfo.title}
            </h1>
            <p className="admin-header-sub" style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
              {pageInfo.sub}
            </p>
          </div>

          {/* Search bar */}
          <div className="admin-header-search" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem' }} />
            <input
              type="text"
              placeholder="Search portal..."
              style={{
                paddingLeft: '2.2rem', paddingRight: '1rem', paddingTop: '0.5rem', paddingBottom: '0.5rem',
                border: '1.5px solid #e8ecf2', borderRadius: '10px',
                background: '#f8f9fc', fontSize: '0.82rem', fontWeight: 500, color: '#1e293b',
                outline: 'none', fontFamily: 'inherit', width: 180,
                transition: 'all 0.2s',
              }}
            />
          </div>

          {/* Notifications & Mail Interactive Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', position: 'relative' }}>
            
            {/* Bell Notification Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowNotifMenu(!showNotifMenu); setShowMailMenu(false); }}
                style={{
                  position: 'relative', cursor: 'pointer',
                  width: 40, height: 40, borderRadius: '11px',
                  background: showNotifMenu ? 'rgba(74,0,74,0.1)' : '#f8f9fc',
                  border: '1px solid #e8ecf2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', outline: 'none',
                }}
              >
                <Bell size={17} color={showNotifMenu ? BRAND : "#64748b"} />
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: '50%',
                  background: '#ef4444', color: '#fff',
                  fontSize: '0.62rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 6px rgba(239,68,68,0.35)',
                }}>4</span>
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifMenu && (
                <div style={{
                  position: 'absolute', right: -40, top: 48, width: 310,
                  background: '#ffffff', borderRadius: '14px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
                  padding: '1rem', zIndex: 200, animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                    <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#1e0538' }}>Notifications</h4>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: BRAND, background: BRAND_SOFT, padding: '0.15rem 0.5rem', borderRadius: '10px' }}>4 New</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: 250, overflowY: 'auto' }}>
                    {notificationsList.map(n => (
                      <div key={n.id} style={{ padding: '0.55rem', borderRadius: '8px', background: n.unread ? '#fdf4ff' : '#f8fafc', borderLeft: n.unread ? `3px solid ${BRAND}` : 'none' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{n.title}</p>
                        <p style={{ margin: '0.15rem 0', fontSize: '0.73rem', color: '#64748b' }}>{n.desc}</p>
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mail Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowMailMenu(!showMailMenu); setShowNotifMenu(false); }}
                style={{
                  position: 'relative', cursor: 'pointer',
                  width: 40, height: 40, borderRadius: '11px',
                  background: showMailMenu ? 'rgba(249,115,22,0.1)' : '#f8f9fc',
                  border: '1px solid #e8ecf2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', outline: 'none',
                }}
              >
                <Mail size={17} color={showMailMenu ? "#f97316" : "#64748b"} />
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: '50%',
                  background: '#f97316', color: '#fff',
                  fontSize: '0.62rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 6px rgba(249,115,22,0.35)',
                }}>3</span>
              </button>

              {/* Mail Popover Dropdown */}
              {showMailMenu && (
                <div style={{
                  position: 'absolute', right: 0, top: 48, width: 310,
                  background: '#ffffff', borderRadius: '14px',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
                  padding: '1rem', zIndex: 200, animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                    <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#1e0538' }}>Staff Inbox</h4>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#f97316', background: '#fff7ed', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>3 Messages</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: 250, overflowY: 'auto' }}>
                    {messagesList.map(m => (
                      <div key={m.id} style={{ padding: '0.55rem', borderRadius: '8px', background: '#f8fafc' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b' }}>{m.sender}</span>
                          <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{m.time}</span>
                        </div>
                        <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', fontWeight: 700, color: BRAND }}>{m.subject}</p>
                        <p style={{ margin: '0.1rem 0 0', fontSize: '0.72rem', color: '#64748b' }}>{m.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Admin avatar + dropdown */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            cursor: 'pointer', padding: '0.3rem 0.5rem', borderRadius: '10px',
            transition: 'all 0.2s',
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '10px',
              background: `linear-gradient(135deg, ${BRAND} 0%, rgb(120, 0, 120) 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.78rem', fontWeight: 800, color: '#fff',
              boxShadow: '0 2px 8px rgba(74,0,74,0.25)', flexShrink: 0,
            }}>{initials}</div>
            <div className="admin-header-name" style={{ lineHeight: 1.2 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                {(adminUser?.name || 'David Anibe').split(' ').slice(0, 2).join(' ')}
              </p>
            </div>
          </div>

          {/* Log out */}
          <button
            onClick={onLogout}
            style={{
              background: 'none', border: '1.5px solid #e8ecf2', borderRadius: '9px',
              cursor: 'pointer', color: '#64748b', padding: '0.4rem 0.75rem',
              fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}
          >
            <LogOut size={14} />
            <span className="admin-logout-text">Logout</span>
          </button>
        </header>

        {/* ── Page Content ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
