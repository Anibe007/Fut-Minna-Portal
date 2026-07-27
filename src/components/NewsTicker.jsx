import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, Sparkles } from 'lucide-react';
import { announcements } from '../data/portalData';

export default function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="glass-card"
      style={{
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        padding: '0.75rem 1.25rem',
        marginBottom: '1.75rem',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 8px 24px rgba(30, 5, 56, 0.12)'
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #6b1fad 0%, #420f73 100%)',
        color: '#ffffff',
        padding: '0.35rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 10px rgba(107, 31, 173, 0.3)'
      }}>
        <Bell size={14} />
        <span>ANNOUNCEMENTS</span>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#334155',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          transition: 'all 0.4s ease-in-out'
        }}>
          {announcements[currentIndex]}
        </p>
      </div>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
        style={{
          background: 'rgba(243, 232, 255, 0.8)',
          border: 'none',
          color: '#581c87',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0
        }}
        title="Next notice"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
