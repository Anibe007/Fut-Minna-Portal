import React from 'react';
import { Info, FileText, BookOpen, Award, ArrowRight } from 'lucide-react';
import { applicationCards } from '../data/portalData';

export default function Applications({ onOpenInstructions }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FileText': return <FileText size={24} color="#6b1fad" />;
      case 'BookOpen': return <BookOpen size={24} color="#6b1fad" />;
      case 'Award': return <Award size={24} color="#6b1fad" />;
      default: return <FileText size={24} color="#6b1fad" />;
    }
  };

  return (
    <div>
      {/* Section Badge Header */}
      <div style={{ marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="section-badge">APPLICATIONS</span>
      </div>

      {/* Application Cards Grid */}
      <div className="cards-row">
        {applicationCards.map((card) => (
          <div
            key={card.id}
            className="glass-card mirror-shine"
            style={{
              padding: '1.5rem',
              background: 'rgba(241, 245, 249, 0.82)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '180px'
            }}
          >
            <div>
              {/* Card Icon & Session */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '14px',
                  background: 'rgba(243, 232, 255, 0.9)',
                  border: '1px solid rgba(168, 85, 247, 0.2)'
                }}>
                  {getIcon(card.icon)}
                </div>
              </div>

              {/* Title & Session */}
              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#1e0538',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.2px',
                marginBottom: '0.35rem'
              }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#64748b', fontWeight: 600, marginBottom: '1rem' }}>
                {card.session}
              </p>
            </div>

            {/* Bottom Status & Instructions Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
              <div className="pill-open">
                <span className="dot" />
                <span>{card.status}</span>
              </div>

              <button
                onClick={() => onOpenInstructions(card.instructionsKey)}
                className="btn-secondary-light"
                title="View step-by-step application instructions"
              >
                <Info size={14} color="#6b1fad" />
                <span>Instructions</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
