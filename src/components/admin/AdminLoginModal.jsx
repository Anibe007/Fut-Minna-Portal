import React, { useState } from 'react';
import { X, Eye, EyeOff, ShieldAlert } from 'lucide-react';

const DEMO_CREDENTIALS = [
  { username: 'David Anibe', password: 'admin123', name: 'David Anibe Daniel', role: 'Super Administrator' },
  { username: 'admin',       password: 'admin123', name: 'Admin User',          role: 'Administrator' },
];

export default function AdminLoginModal({ onClose, onLoginSuccess }) {
  const [username, setUsername]         = useState('David Anibe');
  const [password, setPassword]         = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const match = DEMO_CREDENTIALS.find(
      (c) => c.username.toLowerCase() === username.trim().toLowerCase() && c.password === password
    );

    if (!match) {
      setError('Invalid User ID or Password. Please try again.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({ username: match.username, name: match.name, role: match.role });
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1000 }}>
      <div
        className="modal-glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '430px',
          width: '90%',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '1.75rem 2rem 2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <h3 style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#1e0538',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em'
          }}>
            Staff Login
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#475569',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Purple/Gold Divider Bar (matching image 1) */}
        <div style={{
          height: '3px',
          background: 'rgb(74, 0, 74)',
          borderRadius: '2px',
          marginBottom: '1.5rem'
        }} />

        {/* Error notification */}
        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b',
            padding: '0.7rem 1rem', borderRadius: '10px', fontSize: '0.85rem',
            fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#475569',
              marginBottom: '0.4rem'
            }}>
              User ID / Username
            </label>
            <input
              type="text"
              placeholder="Ismail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: '1.5px solid #dbeafe',
                background: '#eff6ff',
                fontSize: '0.95rem',
                color: '#1e293b',
                outline: 'none',
                fontWeight: 600,
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#475569',
              marginBottom: '0.4rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="•••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 2.8rem 0.8rem 1rem',
                  borderRadius: '10px',
                  border: '1.5px solid #dbeafe',
                  background: '#eff6ff',
                  fontSize: '0.95rem',
                  color: '#1e293b',
                  outline: 'none',
                  fontWeight: 600,
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#64748b'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#ffffff',
              background: 'rgb(74, 0, 74)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(74, 0, 74, 0.3)',
              transition: 'background 0.2s ease',
              fontFamily: 'inherit'
            }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <span>Login →</span>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8', marginTop: '1.25rem' }}>
          Demo Credentials: ID <strong>David Anibe</strong> · Password <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}

