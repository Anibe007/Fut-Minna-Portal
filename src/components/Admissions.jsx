import React from 'react';
import { GraduationCap, Info, ExternalLink } from 'lucide-react';
import { admissionStatusCards } from '../data/portalData';

export default function Admissions({ onCheckStatus, onOpenInstructions }) {
  return (
    <div>
      {/* Section Badge Header */}
      <div style={{ marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="section-badge">ADMISSIONS</span>
      </div>

      {/* Admission Cards Row */}
      <div className="cards-row">
        {admissionStatusCards.map((card) => (
          <div
            key={card.id}
            className="glass-card mirror-shine"
            style={{
              padding: '1.5rem',
              background: 'rgba(241, 245, 249, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '190px'
            }}
          >
            <div>
              {/* Graduation Cap Badge Icon */}
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(243, 232, 255, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid rgba(168, 85, 247, 0.25)'
              }}>
                <GraduationCap size={22} color="#581c87" />
              </div>

              {/* Title & Session */}
              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#1e0538',
                fontFamily: 'var(--font-display)',
                marginBottom: '0.35rem'
              }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#64748b', fontWeight: 600, marginBottom: '1.25rem' }}>
                {card.session}
              </p>
            </div>

            {/* Bottom Actions: Check Now Pill & Instructions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
              <button
                onClick={() => onCheckStatus(card)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <div className="pill-check">
                  <span className="dot" />
                  <span>{card.actionText}</span>
                </div>
              </button>

              <button
                onClick={() => onOpenInstructions('undergraduate')}
                className="btn-secondary-light"
                title="View requirements"
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
