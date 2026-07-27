import React from 'react';
import { X, Home, FileText, CreditCard, GraduationCap, UserCheck } from 'lucide-react';
import { sidebarItems, topNavButtons } from '../data/portalData';

export default function MobileNav({ isOpen, onClose, activeTab, setActiveTab, onOpenModal }) {
  if (!isOpen) return null;

  const getSidebarIcon = (iconName) => {
    switch (iconName) {
      case 'Home':          return <Home size={20} />;
      case 'FileText':      return <FileText size={20} />;
      case 'CreditCard':    return <CreditCard size={20} />;
      case 'GraduationCap': return <GraduationCap size={20} />;
      case 'UserCheck':     return <UserCheck size={20} />;
      default:              return null;
    }
  };

  const getHeaderIcon = (iconName) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck size={18} />;
      case 'CreditCard': return <CreditCard size={18} />;
      case 'GraduationCap': return <GraduationCap size={18} />;
      default: return null;
    }
  };

  return (
    <div className="mobile-nav-overlay" onClick={onClose}>
      <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>

        {/* Drawer Header — Logo + Cancel Button */}
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src="/fut_logo.jpg"
              alt="FUT-MINNA Logo"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                objectFit: 'contain',
                background: '#ffffff',
                padding: '2px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
              }}
            />
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                FUT-MINNA
              </h3>
              <p style={{ color: '#d4af37', fontSize: '0.72rem', fontWeight: 600 }}>Portal Navigation</p>
            </div>
          </div>

          {/* X Close button — CSS hover turns red & rotates */}
          <button
            onClick={onClose}
            className="btn-close-drawer"
            aria-label="Cancel and close menu"
            title="Cancel & Close Menu"
            id="btn-close-mobile-nav"
          >
            <X size={22} />
          </button>
        </div>

        {/* Main Nav Items — use CSS class for :hover */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
          <p style={{ color: '#d4af37', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Main Menu
          </p>

          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); onClose(); }}
                className={`drawer-nav-item${isActive ? ' active' : ''}`}
              >
                <span style={{ color: isActive ? '#c084fc' : '#94a3b8' }}>
                  {getSidebarIcon(item.icon)}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', margin: '1rem 0' }} />

          <p style={{ color: '#d4af37', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Quick Portals
          </p>

          {/* Portal buttons — CSS class handles :hover slide effect */}
          {topNavButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => { onOpenModal(btn.id); onClose(); }}
              className="drawer-portal-btn"
            >
              {getHeaderIcon(btn.icon)}
              <span>{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Close Navigation button at bottom — CSS hover turns it red */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={onClose}
            className="drawer-close-bottom"
            id="btn-close-mobile-nav-bottom"
          >
            <X size={18} />
            <span>Close Navigation</span>
          </button>
        </div>

      </div>
    </div>
  );
}
