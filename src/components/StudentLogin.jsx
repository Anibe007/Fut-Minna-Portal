import React, { useState } from 'react';
import { Eye, EyeOff, Key, LogIn, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function StudentLogin({ onForgotPassword, onLoginSuccess }) {
  const [username, setUsername] = useState('Ismail');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both User ID and Password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Welcome back, ${username}! Redirecting to student dashboard...`);
      if (onLoginSuccess) {
        onLoginSuccess(username);
      }
    }, 1200);
  };

  return (
    <div 
      className="glass-card mirror-shine"
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(32px) saturate(220%)',
        WebkitBackdropFilter: 'blur(32px) saturate(220%)',
        padding: '2.25rem 2rem 2rem 2rem',
        borderTop: '4px solid #7B1FA2',
        boxShadow: '0 24px 60px rgba(10, 0, 20, 0.35), 0 0 0 1px rgba(255,255,255,0.7) inset',
        border: '1px solid rgba(255, 255, 255, 0.75)',
        borderTop: '4px solid #7B1FA2',
      }}
    >
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{
          fontSize: '1.65rem',
          fontWeight: 800,
          color: '#1e0538',
          fontFamily: 'var(--font-display)',
          marginBottom: '0.35rem'
        }}>
          Student Login
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>
          Enter your credentials to access your portal.
        </p>
      </div>

      {errorMsg && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fca5a5',
          color: '#991b1b',
          padding: '0.75rem 1rem',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <ShieldAlert size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #6ee7b7',
          color: '#065f46',
          padding: '0.75rem 1rem',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* User ID / Username */}
        <div className="form-group">
          <label className="form-label">User ID / Username</label>
          <div className="input-wrapper">
            <input
              type="text"
              className="glass-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Ismail or FUT/2026/001"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group" style={{ marginBottom: '1.75rem' }}>
          <label className="form-label">Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="input-icon-right"
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-purple-primary"
          style={{
            width: '100%',
            padding: '0.9rem',
            fontSize: '1.05rem',
            borderRadius: '14px'
          }}
        >
          {loading ? (
            <span>Authenticating...</span>
          ) : (
            <>
              <LogIn size={20} />
              <span>Login</span>
            </>
          )}
        </button>
      </form>

      {/* Forgot Password Pill Button */}
      <div style={{
        marginTop: '2rem',
        paddingTop: '1.25rem',
        borderTop: '1px dashed #e2e8f0',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button
          onClick={onForgotPassword}
          className="btn-forgot-pwd"
          id="btn-forgot-password"
        >
          <Key size={15} color="#6B21A8" />
          <span>Forgot Password?</span>
        </button>
      </div>

    </div>
  );
}
