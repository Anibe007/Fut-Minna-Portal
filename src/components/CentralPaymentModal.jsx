import React, { useState } from 'react';
import {
  X, CreditCard, Search, CheckCircle2, Clock, AlertCircle,
  Shield, ChevronDown, ArrowRight, Banknote, Receipt,
  Building2, Loader2, ChevronRight, Lock, Sparkles, Wifi
} from 'lucide-react';

const BRAND      = 'rgb(74, 0, 74)';
const BRAND_SOFT = 'rgba(74, 0, 74, 0.08)';

const FEE_CATEGORIES = [
  { id: 'school-fees',    label: 'School Fees',          amount: '₦150,000', icon: Building2,  popular: true },
  { id: 'acceptance',     label: 'Acceptance Fee',        amount: '₦25,000',  icon: CheckCircle2 },
  { id: 'post-utme',      label: 'Post-UTME Screening',  amount: '₦2,000',   icon: Shield },
  { id: 'pg-application', label: 'PG Application Fee',    amount: '₦15,000',  icon: Receipt },
  { id: 'pre-degree',     label: 'Pre-Degree Fees',       amount: '₦120,000', icon: Banknote },
  { id: 'ict-levy',       label: 'ICT Development Levy',  amount: '₦10,000',  icon: CreditCard },
  { id: 'sports-health',  label: 'Sports & Health Levy', amount: '₦5,000',   icon: CreditCard },
  { id: 'dept-dues',      label: 'Departmental Dues',     amount: '₦3,500',   icon: Receipt },
];

const PAYMENT_METHODS = [
  { id: 'remita', label: 'Remita', desc: 'Pay via Remita RRR', logo: '🏦' },
  { id: 'card',   label: 'Card Payment', desc: 'Visa / Mastercard / Verve', logo: '💳' },
  { id: 'bank',   label: 'Bank Transfer', desc: 'Direct bank transfer', logo: '🏧' },
];

export default function CentralPaymentModal({ onClose }) {
  const [step, setStep]             = useState('select');  // select | details | processing | success
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('remita');
  const [matricInput, setMatricInput] = useState('FUT/2025/007');
  const [searchDone, setSearchDone]   = useState(false);
  const [searching, setSearching]     = useState(false);

  const handleSearch = () => {
    if (!matricInput.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setSearchDone(true);
    }, 800);
  };

  const handleProceed = () => {
    if (!selectedFee) return;
    setStep('details');
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2500);
  };

  const selectedFeeData = FEE_CATEGORIES.find(f => f.id === selectedFee);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(10, 0, 20, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: step === 'select' ? '680px' : '520px',
          background: '#ffffff',
          borderRadius: '22px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px -12px rgba(74, 0, 74, 0.4), 0 0 0 1px rgba(74,0,74,0.06)',
          display: 'flex', flexDirection: 'column',
          maxHeight: '92vh',
          transition: 'max-width 0.3s ease',
        }}
      >
        {/* ── HEADER ── */}
        <div style={{
          background: `linear-gradient(135deg, ${BRAND} 0%, rgb(120, 0, 120) 60%, rgb(90, 0, 110) 100%)`,
          padding: '1.5rem 1.75rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: 46, height: 46, borderRadius: '14px',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}>
                <CreditCard size={24} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                  Central Payment System
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                  <Lock size={11} color="rgba(255,255,255,0.6)" />
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                    Secure Remita Payment Gateway
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px',
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', backdropFilter: 'blur(4px)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem' }}>

          {/* ══ STEP 1: SELECT FEE ══ */}
          {step === 'select' && (
            <div>
              {/* Student lookup */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: BRAND, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Student Matric Number
                </label>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text" value={matricInput} onChange={e => setMatricInput(e.target.value)}
                      placeholder="e.g. FUT/2025/007"
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                      style={{
                        width: '100%', paddingLeft: '2.4rem', paddingRight: '1rem', paddingTop: '0.65rem', paddingBottom: '0.65rem',
                        borderRadius: '10px', border: '1.5px solid #e2e8f0',
                        background: '#f8fafc', fontSize: '0.875rem', fontWeight: 600,
                        color: '#1e293b', outline: 'none', fontFamily: 'inherit',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = '0 0 0 3px rgba(74,0,74,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <button onClick={handleSearch} disabled={searching} style={{
                    background: BRAND, color: '#fff', border: 'none', borderRadius: '10px',
                    padding: '0 1.25rem', fontWeight: 700, fontSize: '0.85rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(74,0,74,0.3)',
                    transition: 'all 0.2s', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(74,0,74,0.5), 0 0 14px rgba(74,0,74,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(74,0,74,0.3)'; }}
                  >
                    {searching ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={15} />}
                    Verify
                  </button>
                </div>

                {/* Student info card */}
                {searchDone && (
                  <div style={{
                    marginTop: '0.85rem', background: BRAND_SOFT, border: `1px solid rgba(74,0,74,0.12)`,
                    borderRadius: '12px', padding: '0.85rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: '12px',
                      background: `linear-gradient(135deg, ${BRAND}, rgb(120,0,120))`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem', fontWeight: 800, color: '#fff', flexShrink: 0,
                    }}>DA</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 800, color: '#1e0538', fontSize: '0.9rem', margin: 0 }}>David Anibe Daniel</p>
                      <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0.1rem 0 0' }}>
                        {matricInput} · B.Tech. Computer Science · 100L
                      </p>
                    </div>
                    <CheckCircle2 size={20} color="#22c55e" />
                  </div>
                )}
              </div>

              {/* Fee categories */}
              {searchDone && (
                <>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: BRAND, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
                    Select Payment Type
                  </p>
                  <div className="payment-fee-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    {FEE_CATEGORIES.map(fee => {
                      const Icon = fee.icon;
                      const active = selectedFee === fee.id;
                      return (
                        <button
                          key={fee.id}
                          onClick={() => setSelectedFee(fee.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.7rem',
                            padding: '0.85rem 1rem', borderRadius: '12px',
                            border: active ? `2px solid ${BRAND}` : '1.5px solid #e8ecf2',
                            background: active ? BRAND_SOFT : '#fff',
                            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                            transition: 'all 0.2s ease', position: 'relative',
                            boxShadow: active ? `0 4px 14px rgba(74,0,74,0.15)` : '0 1px 4px rgba(0,0,0,0.04)',
                          }}
                          onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(74,0,74,0.25)'; e.currentTarget.style.background = '#fafbfc'; }}}
                          onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#e8ecf2'; e.currentTarget.style.background = '#fff'; }}}
                        >
                          {fee.popular && (
                            <span style={{
                              position: 'absolute', top: -6, right: 8,
                              background: '#22c55e', color: '#fff',
                              fontSize: '0.58rem', fontWeight: 800, padding: '0.1rem 0.45rem',
                              borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.03em',
                            }}>Popular</span>
                          )}
                          <div style={{
                            width: 36, height: 36, borderRadius: '10px',
                            background: active ? `rgba(74,0,74,0.12)` : '#f1f5f9',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            transition: 'all 0.2s',
                          }}>
                            <Icon size={18} color={active ? BRAND : '#64748b'} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: active ? BRAND : '#1e293b', margin: 0 }}>{fee.label}</p>
                            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: active ? 'rgb(100,0,100)' : '#64748b', margin: '0.1rem 0 0' }}>{fee.amount}</p>
                          </div>
                          {active && <CheckCircle2 size={18} color={BRAND} />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Proceed button */}
                  <button
                    onClick={handleProceed}
                    disabled={!selectedFee}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem',
                      background: selectedFee ? `linear-gradient(135deg, ${BRAND}, rgb(110,0,110))` : '#e2e8f0',
                      color: selectedFee ? '#fff' : '#94a3b8',
                      border: 'none', borderRadius: '12px', padding: '0.9rem',
                      fontWeight: 800, fontSize: '0.9rem', cursor: selectedFee ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit', transition: 'all 0.25s',
                      boxShadow: selectedFee ? '0 4px 18px rgba(74,0,74,0.35)' : 'none',
                    }}
                    onMouseEnter={e => { if (selectedFee) { e.currentTarget.style.boxShadow = '0 6px 24px rgba(74,0,74,0.55), 0 0 16px rgba(74,0,74,0.3)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                    onMouseLeave={e => { if (selectedFee) { e.currentTarget.style.boxShadow = '0 4px 18px rgba(74,0,74,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}}
                  >
                    Proceed to Payment
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>
          )}

          {/* ══ STEP 2: PAYMENT DETAILS ══ */}
          {step === 'details' && selectedFeeData && (
            <div>
              {/* Summary card */}
              <div style={{
                background: BRAND_SOFT, border: `1.5px solid rgba(74,0,74,0.12)`,
                borderRadius: '14px', padding: '1.1rem 1.25rem', marginBottom: '1.5rem',
              }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem' }}>Payment Summary</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>{selectedFeeData.label}</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 900, color: BRAND }}>{selectedFeeData.amount}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                  Student: <strong>David Anibe Daniel</strong> · {matricInput}
                </p>
              </div>

              {/* Payment method */}
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: BRAND, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
                Select Payment Method
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {PAYMENT_METHODS.map(pm => {
                  const active = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                        padding: '0.95rem 1.15rem', borderRadius: '12px',
                        border: active ? `2px solid ${BRAND}` : '1.5px solid #e8ecf2',
                        background: active ? BRAND_SOFT : '#fff',
                        cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                        transition: 'all 0.2s ease',
                        boxShadow: active ? '0 4px 14px rgba(74,0,74,0.12)' : '0 1px 4px rgba(0,0,0,0.03)',
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{pm.logo}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.88rem', fontWeight: 700, color: active ? BRAND : '#1e293b', margin: 0 }}>{pm.label}</p>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.1rem 0 0' }}>{pm.desc}</p>
                      </div>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        border: `2px solid ${active ? BRAND : '#cbd5e1'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}>
                        {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: BRAND }} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Security notice */}
              <div style={{
                background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px',
                padding: '0.75rem 1rem', marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
              }}>
                <Lock size={15} color="#059669" />
                <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600 }}>
                  Your payment is protected by 256-bit SSL encryption
                </span>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setStep('select')} style={{
                  padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1.5px solid #e2e8f0',
                  background: '#f8fafc', color: '#64748b', fontWeight: 700, fontSize: '0.875rem',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                }}>Back</button>
                <button onClick={handlePay} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem',
                  background: `linear-gradient(135deg, #059669, #047857)`,
                  color: '#fff', border: 'none', borderRadius: '12px', padding: '0.85rem',
                  fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 18px rgba(5,150,105,0.35)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(5,150,105,0.55), 0 0 16px rgba(5,150,105,0.3)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 18px rgba(5,150,105,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Lock size={15} />
                  Pay {selectedFeeData.amount} Now
                </button>
              </div>
            </div>
          )}

          {/* ══ STEP 3: PROCESSING ══ */}
          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: BRAND_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}>
                <Loader2 size={36} color={BRAND} style={{ animation: 'spin 1.2s linear infinite' }} />
              </div>
              <h3 style={{ fontWeight: 800, color: '#1e0538', fontSize: '1.15rem', margin: '0 0 0.4rem' }}>
                Processing Payment…
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 0.75rem' }}>
                Connecting to Remita Payment Gateway
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>
                Please do not close this window
              </p>
            </div>
          )}

          {/* ══ STEP 4: SUCCESS ══ */}
          {step === 'success' && selectedFeeData && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 0 0 8px rgba(34,197,94,0.1), 0 0 30px rgba(34,197,94,0.15)',
              }}>
                <CheckCircle2 size={40} color="#16a34a" />
              </div>
              <h3 style={{ fontWeight: 800, color: '#1e0538', fontSize: '1.2rem', margin: '0 0 0.35rem' }}>
                Payment Successful! 🎉
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 1.5rem' }}>
                Your {selectedFeeData.label} payment of <strong style={{ color: '#059669' }}>{selectedFeeData.amount}</strong> has been received.
              </p>

              {/* Receipt card */}
              <div style={{
                background: '#f8f9fc', border: '1.5px dashed #cbd5e1',
                borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem',
                textAlign: 'left', maxWidth: 360, margin: '0 auto 1.5rem',
              }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.75rem' }}>
                  Payment Receipt
                </p>
                {[
                  ['Student', 'David Anibe Daniel'],
                  ['Matric No.', matricInput],
                  ['Payment', selectedFeeData.label],
                  ['Amount', selectedFeeData.amount],
                  ['RRR', 'RRR-2025-' + Math.random().toString(36).substr(2, 8).toUpperCase()],
                  ['Date', new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })],
                  ['Status', 'Confirmed'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #eef2f6' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{k}</span>
                    <span style={{ fontSize: '0.78rem', color: '#1e293b', fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center' }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: '#f8f9fc', color: '#475569', border: '1.5px solid #e2e8f0',
                  borderRadius: '10px', padding: '0.65rem 1.15rem',
                  fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <Receipt size={14} /> Print Receipt
                </button>
                <button onClick={onClose} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: `linear-gradient(135deg, ${BRAND}, rgb(110,0,110))`,
                  color: '#fff', border: 'none', borderRadius: '10px',
                  padding: '0.65rem 1.5rem', fontWeight: 800, fontSize: '0.85rem',
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 14px rgba(74,0,74,0.35)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(74,0,74,0.5), 0 0 14px rgba(74,0,74,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(74,0,74,0.35)'; }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
      `}</style>
    </div>
  );
}
