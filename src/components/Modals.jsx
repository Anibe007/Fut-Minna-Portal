import React, { useState } from 'react';
import { X, Search, CheckCircle2, ShieldCheck, Mail, Send, HelpCircle, FileText } from 'lucide-react';
import { instructionsData } from '../data/portalData';

export function AdmissionCheckModal({ cardData, onClose }) {
  const [regNum, setRegNum] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!regNum.trim()) return;

    setSearching(true);
    setResult(null);

    setTimeout(() => {
      setSearching(false);
      setResult({
        name: 'Ismail Abubakar',
        regNo: regNum.toUpperCase(),
        course: 'B.Tech. Computer Science',
        department: 'School of Information & Communication Technology',
        status: 'PROVISIONALLY ADMITTED',
        session: cardData?.session || '2026/2027'
      });
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-glass-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(243, 232, 255, 0.9)' }}>
              <ShieldCheck size={24} color="#6b1fad" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e0538', fontFamily: 'var(--font-display)' }}>
                {cardData?.title || 'Check Admission Status'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{cardData?.session}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-close-drawer"
            aria-label="Close modal"
            style={{ color: '#475569', background: 'rgba(0, 0, 0, 0.05)', border: '1px solid #cbd5e1' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Form */}
        {!result ? (
          <form onSubmit={handleCheck}>
            <div className="form-group">
              <label className="form-label">Registration / Application Number</label>
              <input
                type="text"
                className="glass-input"
                placeholder="e.g. 202612345678AB or FUT/UG/2026/012"
                value={regNum}
                onChange={(e) => setRegNum(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={searching}
              className="btn-purple-primary"
              style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}
            >
              {searching ? (
                <span>Searching Database...</span>
              ) : (
                <>
                  <Search size={18} />
                  <span>Check Admission Status</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Result View */
          <div>
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #6ee7b7',
              borderRadius: '14px',
              padding: '1.25rem',
              textAlign: 'center',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={36} color="#059669" style={{ margin: '0 auto 0.5rem' }} />
              <h4 style={{ color: '#065f46', fontSize: '1.1rem', fontWeight: 800 }}>CONGRATULATIONS!</h4>
              <p style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 700 }}>{result.status}</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div><strong style={{ color: '#64748b' }}>Candidate Name:</strong> <span style={{ color: '#0f172a', fontWeight: 700 }}>{result.name}</span></div>
              <div><strong style={{ color: '#64748b' }}>Reg Number:</strong> <span style={{ color: '#0f172a', fontWeight: 700 }}>{result.regNo}</span></div>
              <div><strong style={{ color: '#64748b' }}>Course Offered:</strong> <span style={{ color: '#581c87', fontWeight: 800 }}>{result.course}</span></div>
              <div><strong style={{ color: '#64748b' }}>Faculty:</strong> <span style={{ color: '#0f172a' }}>{result.department}</span></div>
            </div>

            <button
              onClick={() => setResult(null)}
              className="btn-purple-outline"
              style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}
            >
              Check Another Number
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export function InstructionsModal({ instructionsKey, onClose }) {
  const data = instructionsData[instructionsKey] || instructionsData['pre-degree'];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-glass-card" onClick={(e) => e.stopPropagation()}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(243, 232, 255, 0.9)' }}>
              <FileText size={22} color="#6b1fad" />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e0538', fontFamily: 'var(--font-display)' }}>
              {data.title}
            </h3>
          </div>

          <button onClick={onClose} className="btn-close-drawer" style={{ color: '#475569', background: 'rgba(0, 0, 0, 0.05)', border: '1px solid #cbd5e1' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '350px', overflowY: 'auto' }}>
          {data.steps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px' }}>
              <span style={{
                background: '#6b1fad',
                color: '#fff',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800,
                flexShrink: 0
              }}>
                {idx + 1}
              </span>
              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>
                {step}
              </p>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn-purple-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
          I Understand & Proceed
        </button>

      </div>
    </div>
  );
}

export function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-glass-card" onClick={(e) => e.stopPropagation()}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e0538', fontFamily: 'var(--font-display)' }}>
            Reset Portal Password
          </h3>
          <button onClick={onClose} className="btn-close-drawer" style={{ color: '#475569', background: 'rgba(0, 0, 0, 0.05)', border: '1px solid #cbd5e1' }}>
            <X size={20} />
          </button>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Enter your registered portal Email Address or User ID to receive a secure password reset link.
            </p>

            <div className="form-group">
              <label className="form-label">Registered Email / User ID</label>
              <input
                type="text"
                className="glass-input"
                placeholder="e.g. student@futminna.edu.ng or Ismail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-purple-primary" style={{ width: '100%', marginTop: '1rem' }}>
              <Send size={18} />
              <span>Send Reset Instructions</span>
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle2 size={42} color="#059669" style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', color: '#065f46', fontWeight: 800, marginBottom: '0.5rem' }}>Reset Link Dispatched!</h4>
            <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '1.5rem' }}>
              We have sent password recovery steps to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
            <button onClick={onClose} className="btn-purple-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Return to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
