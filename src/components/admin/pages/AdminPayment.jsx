import React, { useState } from 'react';
import {
  ChevronDown, Search, RefreshCcw, Download,
  CreditCard, CheckCircle2, Clock, XCircle,
  TrendingUp, ArrowUpRight, Filter
} from 'lucide-react';

const BRAND      = 'rgb(74, 0, 74)';
const BRAND_SOFT = 'rgba(74, 0, 74, 0.08)';

const PAYMENT_STATS = [
  { label: 'Total Revenue',   value: '₦28.4M', icon: CreditCard,   color: BRAND,     bg: BRAND_SOFT, change: '+8.2%' },
  { label: 'Successful',      value: '3,241',   icon: CheckCircle2, color: '#059669', bg: '#ecfdf5',  change: '+12.1%' },
  { label: 'Pending',         value: '187',     icon: Clock,        color: '#d97706', bg: '#fffbeb',  change: '-3.4%' },
  { label: 'Failed',          value: '34',      icon: XCircle,      color: '#dc2626', bg: '#fef2f2',  change: '-18%' },
];

const MOCK_PAYMENTS = [
  { id: 'PAY-001', name: 'Abubakar Musa',    matric: 'FUT/2025/001', type: 'School Fees',   session: '2025/2026', amount: '₦150,000', status: 'Successful', date: '2025-09-14' },
  { id: 'PAY-002', name: 'Fatima Aliyu',     matric: 'FUT/2025/002', type: 'Acceptance Fee', session: '2025/2026', amount: '₦25,000',  status: 'Successful', date: '2025-09-12' },
  { id: 'PAY-003', name: 'Ibrahim Suleiman', matric: 'FUT/2025/003', type: 'School Fees',   session: '2025/2026', amount: '₦150,000', status: 'Pending',    date: '2025-09-15' },
  { id: 'PAY-004', name: 'Maryam Usman',     matric: 'FUT/2025/004', type: 'PG Application', session: '2025/2026', amount: '₦15,000',  status: 'Failed',     date: '2025-09-10' },
  { id: 'PAY-005', name: 'Yusuf Abdullahi',  matric: 'FUT/2025/005', type: 'School Fees',   session: '2025/2026', amount: '₦150,000', status: 'Successful', date: '2025-09-13' },
  { id: 'PAY-006', name: 'Aisha Bello',      matric: 'FUT/2025/006', type: 'Acceptance Fee', session: '2025/2026', amount: '₦25,000',  status: 'Successful', date: '2025-09-11' },
];

const STATUS_STYLE = {
  Successful: { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  Pending:    { bg: '#fef9c3', color: '#854d0e', dot: '#eab308' },
  Failed:     { bg: '#fee2e2', color: '#9f1239', dot: '#f43f5e' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE['Pending'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      background: s.bg, color: s.color,
      padding: '0.22rem 0.7rem', borderRadius: '999px',
      fontSize: '0.73rem', fontWeight: 700,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
}

export default function AdminPayment() {
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = MOCK_PAYMENTS.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.matric.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    const matchS = statusFilter === 'All' || p.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${BRAND} 0%, rgb(110, 0, 110) 100%)`,
        borderRadius: '18px', padding: '1.75rem 2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
              <CreditCard size={24} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0, fontFamily: 'var(--font-display)' }}>
                Payment Management
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '0.1rem 0 0' }}>
                Monitor, filter, and export student payment transactions
              </p>
            </div>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '0.45rem',
            background: '#fff', color: BRAND, border: 'none', borderRadius: '10px',
            padding: '0.6rem 1.25rem', fontWeight: 800, fontSize: '0.85rem',
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {PAYMENT_STATS.map(s => {
          const Icon = s.icon;
          const isUp = s.change.startsWith('+');
          return (
            <div key={s.label} style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '16px', padding: '1.25rem 1.35rem',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              transition: 'all 0.25s ease', cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}
            >
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, margin: '0 0 0.4rem' }}>{s.label}</p>
                <p style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem', lineHeight: 1 }}>{s.value}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ArrowUpRight size={12} color={isUp ? '#059669' : '#dc2626'} style={{ transform: isUp ? 'none' : 'rotate(90deg)' }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isUp ? '#059669' : '#dc2626' }}>{s.change}</span>
                </div>
              </div>
              <div style={{ width: 46, height: 46, borderRadius: '13px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={s.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>

        {/* Toolbar */}
        <div style={{
          padding: '1.1rem 1.5rem', borderBottom: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>Payment Records</h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.1rem 0 0' }}>{filtered.length} transactions</p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{
                appearance: 'none', background: '#f8f9fc', border: '1.5px solid #e8ecf2',
                borderRadius: '9px', padding: '0.5rem 2rem 0.5rem 0.85rem',
                fontSize: '0.82rem', fontWeight: 700, color: '#475569',
                cursor: 'pointer', fontFamily: 'inherit', outline: 'none',
              }}>
                {['All', 'Successful', 'Pending', 'Failed'].map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown size={13} color="#94a3b8" style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  paddingLeft: '2.1rem', paddingRight: '0.85rem', paddingTop: '0.5rem', paddingBottom: '0.5rem',
                  border: '1.5px solid #e8ecf2', borderRadius: '9px', background: '#f8f9fc',
                  fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', outline: 'none', fontFamily: 'inherit',
                  width: 190, transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = '0 0 0 3px rgba(74,0,74,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = '#e8ecf2'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.855rem' }}>
            <thead>
              <tr style={{ background: '#f8f9fc' }}>
                {['Payment ID', 'Student', 'Matric', 'Type', 'Session', 'Amount', 'Date', 'Status'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1.1rem', textAlign: 'left',
                    fontSize: '0.71rem', fontWeight: 700, color: '#64748b',
                    textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id}
                  style={{ borderTop: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafbfc', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,0,74,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafbfc'}
                >
                  <td style={{ padding: '0.85rem 1.1rem', fontFamily: 'monospace', fontWeight: 700, color: BRAND, fontSize: '0.8rem' }}>{p.id}</td>
                  <td style={{ padding: '0.85rem 1.1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: '8px', flexShrink: 0,
                        background: `linear-gradient(135deg, ${BRAND}, rgb(120,0,120))`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.72rem', fontWeight: 800, color: '#fff',
                      }}>{p.name[0]}</div>
                      <span style={{ fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap' }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1.1rem', color: '#64748b', fontWeight: 500, fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.matric}</td>
                  <td style={{ padding: '0.85rem 1.1rem', color: '#475569', fontWeight: 600 }}>{p.type}</td>
                  <td style={{ padding: '0.85rem 1.1rem', color: '#64748b', fontWeight: 500 }}>{p.session}</td>
                  <td style={{ padding: '0.85rem 1.1rem', fontWeight: 800, color: '#0f172a' }}>{p.amount}</td>
                  <td style={{ padding: '0.85rem 1.1rem', color: '#64748b', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{p.date}</td>
                  <td style={{ padding: '0.85rem 1.1rem' }}><StatusBadge status={p.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    <Search size={28} color="#cbd5e1" style={{ marginBottom: '0.5rem' }} />
                    <p style={{ fontWeight: 700, color: '#64748b', margin: '0 0 0.2rem' }}>No results found</p>
                    <p style={{ fontSize: '0.8rem', margin: 0 }}>Try adjusting your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.85rem 1.5rem', borderTop: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#fafbfc',
        }}>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
            Showing <strong style={{ color: '#475569' }}>{filtered.length}</strong> of <strong style={{ color: '#475569' }}>{MOCK_PAYMENTS.length}</strong> payments
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#94a3b8' }}>
            <TrendingUp size={13} color="#22c55e" />
            Updated just now
          </div>
        </div>
      </div>
    </div>
  );
}
