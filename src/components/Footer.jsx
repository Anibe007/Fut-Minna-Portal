import React from 'react';
import { ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';
import { portalInfo } from '../data/portalData';

export default function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.15)',
      background: 'rgba(30, 5, 56, 0.85)',
      backdropFilter: 'blur(16px)',
      color: '#cbd5e1',
      fontSize: '0.825rem',
      padding: '1.25rem 2rem'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        
        {/* Left copyright and university info */}
        <div>
          <p style={{ fontWeight: 600, color: '#f1f5f9' }}>
            © {new Date().getFullYear()} {portalInfo.universityName}. All Rights Reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Admissions & Registration Portal (ePortal V2.0)
          </p>
        </div>

        {/* Center Support Email */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a
            href={`mailto:${portalInfo.supportEmail}`}
            style={{ color: '#c084fc', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Mail size={14} />
            <span>Support: {portalInfo.supportEmail}</span>
          </a>
        </div>

        {/* Right Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981'
          }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>
            Portal Online & Secure (SSL 256-bit)
          </span>
        </div>

      </div>
    </footer>
  );
}
