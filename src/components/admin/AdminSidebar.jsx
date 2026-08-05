import React from 'react';
import {
  LayoutDashboard, Settings, GraduationCap, CreditCard,
  LogOut, ChevronRight, Shield, Sparkles
} from 'lucide-react';

const BRAND = 'rgb(74, 0, 74)';

const navItems = [
  { id: 'dashboard',     label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'control-panel', label: 'Control Panel',   icon: Settings },
  { id: 'admission',     label: 'Admission',       icon: GraduationCap },
  { id: 'payment',       label: 'Payment',         icon: CreditCard },
];

export default function AdminSidebar({ activePage, setActivePage, adminUser, onLogout }) {
  const initials = adminUser?.name
    ? adminUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'DA';

  return (
    <aside style={{
      background: BRAND,
      width: '260px',
      display: 'flex',
      flexDirection: 'column',
      color: '#fff',
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '4px 0 30px rgba(74, 0, 74, 0.2)',
      flexShrink: 0,
    }}>
      {/* Decorative background elements */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 40, left: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

      {/* Logo / Brand Header */}
      <div style={{
        padding: '1.5rem 1.25rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '12px',
            background: 'rgba(255,255,255,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <Shield size={22} color="#fff" />
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, letterSpacing: '-0.01em' }}>FUT-MINNA</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.68rem', margin: 0, fontWeight: 500 }}>Admin Console</p>
          </div>
        </div>
      </div>

      {/* Admin Profile Card */}
      <div style={{
        padding: '1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '12px', padding: '0.85rem',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.05rem', fontWeight: 800, color: '#fff',
            border: '2px solid rgba(255,255,255,0.2)',
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{
              fontWeight: 700, fontSize: '0.85rem', margin: 0,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {adminUser?.name || 'David Anibe Daniel'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
              <Sparkles size={10} color="#22c55e" />
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.68rem', fontWeight: 600 }}>
                {adminUser?.role || 'Super Admin'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '0.85rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <p style={{
          fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          padding: '0 0.5rem', marginBottom: '0.35rem',
        }}>Main Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.75rem 0.85rem',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)'
                  : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                border: 'none',
                borderRadius: '10px',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div style={{
                  position: 'absolute', left: -12, top: '50%', transform: 'translateY(-50%)',
                  width: 4, height: 24, borderRadius: '0 4px 4px 0',
                  background: '#22c55e',
                  boxShadow: '0 0 12px rgba(34, 197, 94, 0.5)',
                }} />
              )}
              <div style={{
                width: 32, height: 32, borderRadius: '8px',
                background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}>
                <Icon size={16} />
              </div>
              <span style={{ flex: 1 }}>{item.label}</span>
              {!isActive && <ChevronRight size={13} style={{ opacity: 0.4 }} />}
            </button>
          );
        })}
      </nav>

      {/* Session Badge */}
      <div style={{ padding: '0 1rem 0.75rem' }}>
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '10px', padding: '0.7rem 0.85rem',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.2rem' }}>Current Session</p>
          <p style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0 }}>2025 / 2026</p>
        </div>
      </div>

      {/* Logout */}
      <div style={{ padding: '0 0.75rem 1rem' }}>
        <button
          onClick={onLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(239, 68, 68, 0.12)',
            color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(239,68,68,0.15)',
            padding: '0.65rem 0.85rem', borderRadius: '10px',
            width: '100%', cursor: 'pointer',
            fontSize: '0.82rem', fontWeight: 700, fontFamily: 'inherit',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
        >
          <LogOut size={15} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
