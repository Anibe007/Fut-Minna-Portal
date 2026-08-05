import React, { useState } from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { announcements } from '../data/portalData';

export default function NewsTicker() {
  const fullText = announcements.join('   •   ');

  return (
    <div
      className="glass-card news-ticker-card"
      style={{
        background: 'rgba(255, 255, 255, 0.90)',
        backdropFilter: 'blur(16px)',
        padding: '0.65rem 1rem',
        marginBottom: '1.5rem',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        boxShadow: '0 8px 24px rgba(30, 5, 56, 0.12)',
        overflow: 'hidden'
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #5E095E 0%, #2e1065 100%)',
        color: '#ffffff',
        padding: '0.4rem 0.85rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 900,
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(94, 9, 94, 0.35)',
        letterSpacing: '0.05em',
        flexShrink: 0,
        zIndex: 2
      }}>
        <Bell size={14} className="bell-ring" />
        <span>ANNOUNCEMENTS</span>
      </div>

      <div className="ticker-track-container" style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div className="ticker-marquee-track">
          <span className="ticker-bold-text">{fullText}</span>
          <span className="ticker-bold-text" aria-hidden="true">{fullText}</span>
        </div>
      </div>
    </div>
  );
}
