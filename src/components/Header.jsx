import React from 'react';
import { UserCheck, CreditCard, GraduationCap, Menu } from 'lucide-react';
import { portalInfo } from '../data/portalData';

export default function Header({ onOpenModal, onToggleMobileMenu }) {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 4px 20px rgba(30, 10, 60, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '3px solid rgb(74, 0, 74)'
    }}>
      {/* Gold gradient accent line at very bottom */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, rgb(74, 0, 74) 0%, #d4af37 40%, #f0d060 50%, #d4af37 60%, rgb(74, 0, 74) 100%)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
      }} />

      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0.7rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left — FUT-MINNA Logo + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <img
            src="/fut_logo.jpg"
            alt="Federal University of Technology Minna Seal"
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              objectFit: 'contain',
              background: '#ffffff',
              padding: '2px',
              border: '2px solid rgba(74, 0, 74, 0.35)',
              boxShadow: '0 4px 16px rgba(74, 0, 74, 0.2)',
              flexShrink: 0
            }}
          />
          <div className="header-title-text">
            <h1 style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'rgb(74, 0, 74)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.2,
              letterSpacing: '-0.3px'
            }}>
              {portalInfo.universityName}
            </h1>
            <p style={{
              fontSize: '0.8rem',
              color: 'rgb(74, 0, 74)',
              fontWeight: 600,
              marginTop: '2px',
              letterSpacing: '0.02em'
            }}>
              {portalInfo.portalTitle}
            </p>
          </div>
        </div>

        {/* Desktop Header Buttons — use CSS classes for proper :hover */}
        <div className="header-actions-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            className="hdr-btn-admin"
            onClick={() => onOpenModal('admin-login')}
            id="btn-admin-login"
          >
            <UserCheck size={15} />
            <span>Admin Login</span>
          </button>

          <button
            className="hdr-btn-payments"
            onClick={() => onOpenModal('central-payments')}
            id="btn-central-payments"
          >
            <CreditCard size={15} />
            <span>Central Payments System</span>
          </button>

          <button
            className="hdr-btn-postutme"
            onClick={() => onOpenModal('post-utme')}
            id="btn-post-utme"
          >
            <GraduationCap size={15} />
            <span>Post UTME</span>
          </button>
        </div>

        {/* Mobile Hamburger — CSS class handles hover */}
        <button
          className="mobile-toggle-btn"
          onClick={onToggleMobileMenu}
          aria-label="Open navigation menu"
          id="btn-mobile-menu"
        >
          <Menu size={22} />
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .header-actions-desktop { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
