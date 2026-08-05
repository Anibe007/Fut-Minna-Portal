import React, { useState } from 'react';
import {
  Search, Users, GraduationCap, CheckCircle2, Clock,
  Filter, Download, ChevronDown, Edit3, Eye, MoreHorizontal,
  TrendingUp, UserCheck, UserX
} from 'lucide-react';
import EditStudentRecordsModal from './EditStudentRecordsModal';

const BRAND      = 'rgb(74, 0, 74)';
const BRAND_SOFT = 'rgba(74, 0, 74, 0.08)';

const STUDENTS = [
  { matric: 'FUT/2025/001', name: 'Abubakar Musa',    course: 'B.Tech. Computer Science',         level: '100L', session: '2025/2026', status: 'Admitted',    dept: 'SICT' },
  { matric: 'FUT/2025/002', name: 'Fatima Aliyu',      course: 'B.Tech. Electrical Engineering',   level: '200L', session: '2025/2026', status: 'Admitted',    dept: 'SEET' },
  { matric: 'FUT/2025/003', name: 'Ibrahim Suleiman',  course: 'B.Tech. Civil Engineering',        level: '300L', session: '2025/2026', status: 'Provisional', dept: 'SEET' },
  { matric: 'FUT/2025/004', name: 'Maryam Usman',      course: 'B.Tech. Biochemistry',             level: '100L', session: '2025/2026', status: 'Deferred',    dept: 'SIPET' },
  { matric: 'FUT/2025/005', name: 'Yusuf Abdullahi',   course: 'B.Tech. Mechanical Engineering',   level: '400L', session: '2025/2026', status: 'Admitted',    dept: 'SEET' },
  { matric: 'FUT/2025/006', name: 'Aisha Bello',       course: 'B.Tech. Mathematics & Statistics', level: '200L', session: '2025/2026', status: 'Admitted',    dept: 'SSTE' },
  { matric: 'FUT/2025/007', name: 'Chukwuemeka Nweze', course: 'B.Tech. Agricultural Engineering', level: '300L', session: '2025/2026', status: 'Provisional', dept: 'SIPET' },
  { matric: 'FUT/2025/008', name: 'Hauwa Garba',       course: 'B.Tech. Business Administration',  level: '100L', session: '2025/2026', status: 'Pending',     dept: 'SMAT' },
];

const STATS = [
  { label: 'Total Students', value: '12,481', icon: Users,        color: BRAND,      bg: BRAND_SOFT },
  { label: 'Admitted',       value: '10,924', icon: UserCheck,    color: '#059669',  bg: '#ecfdf5'  },
  { label: 'Provisional',    value: '1,103',  icon: Clock,        color: '#d97706',  bg: '#fffbeb'  },
  { label: 'Deferred',       value: '454',    icon: UserX,        color: '#dc2626',  bg: '#fef2f2'  },
];

const STATUS_STYLE = {
  Admitted:    { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
  Provisional: { bg: '#fef9c3', color: '#854d0e', dot: '#eab308' },
  Deferred:    { bg: '#fee2e2', color: '#9f1239', dot: '#f43f5e' },
  Pending:     { bg: '#dbeafe', color: '#1e40af', dot: '#3b82f6' },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE['Pending'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      background: s.bg, color: s.color,
      padding: '0.22rem 0.7rem', borderRadius: '999px',
      fontSize: '0.73rem', fontWeight: 700, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
}

export default function AdminAdmission() {
  const [showModal, setShowModal]   = useState(false);
  const [editMatric, setEditMatric] = useState('');
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const openEdit = (matric = '') => {
    setEditMatric(matric);
    setShowModal(true);
  };

  const filtered = STUDENTS.filter(s => {
    const q = search.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.matric.toLowerCase().includes(q) || s.course.toLowerCase().includes(q);
    const matchS = statusFilter === 'All' || s.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="admin-page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Page Header ── */}
      <div style={{
        background: `linear-gradient(135deg, ${BRAND} 0%, rgb(110, 0, 110) 100%)`,
        borderRadius: '18px', padding: '1.75rem 2rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: 60, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
              <GraduationCap size={22} color="rgba(255,255,255,0.9)" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'var(--font-display)' }}>
                Admission & Student Records
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.875rem', margin: 0 }}>
              Search, view, and manage student admission data across all sessions
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)',
                color: '#fff', border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '10px', padding: '0.6rem 1.1rem',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <Download size={15} />
              Export CSV
            </button>
            <button
              onClick={() => openEdit('')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                background: '#ffffff', color: BRAND,
                border: 'none', borderRadius: '10px',
                padding: '0.6rem 1.25rem',
                fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(74, 0, 74, 0.4), 0 0 16px rgba(74, 0, 74, 0.2)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Edit3 size={15} />
              Edit Student Record
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {STATS.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} style={{
              background: '#ffffff', border: '1px solid #f1f5f9',
              borderRadius: '14px', padding: '1.1rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.9rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={stat.color} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, margin: 0 }}>{stat.label}</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: '0.1rem 0 0', lineHeight: 1 }}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Table Card ── */}
      <div style={{ background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>

        {/* Table toolbar */}
        <div style={{
          padding: '1.1rem 1.5rem',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>Student Records</h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.1rem 0 0' }}>{filtered.length} records found</p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Status filter */}
            <div style={{ position: 'relative' }}>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  appearance: 'none', background: '#f8fafc', border: '1.5px solid #e2e8f0',
                  borderRadius: '9px', padding: '0.5rem 2rem 0.5rem 0.85rem',
                  fontSize: '0.82rem', fontWeight: 700, color: '#475569',
                  cursor: 'pointer', fontFamily: 'inherit', outline: 'none',
                }}
              >
                {['All', 'Admitted', 'Provisional', 'Deferred', 'Pending'].map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown size={13} color="#94a3b8" style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>

            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search name or matric…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  paddingLeft: '2.1rem', paddingRight: '0.85rem', paddingTop: '0.5rem', paddingBottom: '0.5rem',
                  border: '1.5px solid #e2e8f0', borderRadius: '9px',
                  background: '#f8fafc', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b',
                  outline: 'none', fontFamily: 'inherit', width: '210px',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = '0 0 0 3px rgba(74,0,74,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.855rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                {['Matric No.', 'Student Name', 'Course', 'Dept', 'Level', 'Session', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1rem', textAlign: 'left',
                    fontSize: '0.72rem', fontWeight: 700, color: '#64748b',
                    textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr
                  key={s.matric}
                  style={{
                    borderBottom: '1px solid #f8fafc',
                    transition: 'background 0.15s',
                    background: i % 2 === 0 ? '#ffffff' : '#fafbfc',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(74, 0, 74, 0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : '#fafbfc'}
                >
                  <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 700, color: BRAND, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                    {s.matric}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '8px', flexShrink: 0,
                        background: `linear-gradient(135deg, ${BRAND} 0%, rgb(120, 0, 120) 100%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.78rem', fontWeight: 800, color: '#fff',
                      }}>
                        {s.name[0]}
                      </div>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569', fontWeight: 500, maxWidth: 200 }}>
                    <span title={s.course} style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                      {s.course}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                    <span style={{ background: BRAND_SOFT, color: BRAND, borderRadius: '6px', padding: '0.2rem 0.55rem', fontSize: '0.73rem', fontWeight: 700 }}>
                      {s.dept}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>{s.level}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap' }}>{s.session}</td>
                  <td style={{ padding: '0.85rem 1rem' }}><StatusBadge status={s.status} /></td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button
                      onClick={() => openEdit(s.matric)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        background: BRAND_SOFT, color: BRAND,
                        border: `1px solid rgba(74, 0, 74, 0.18)`,
                        borderRadius: '8px', padding: '0.38rem 0.85rem',
                        fontSize: '0.77rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 0 0 0 rgba(74, 0, 74, 0)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = BRAND; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 0, 74, 0.35), 0 0 10px rgba(74, 0, 74, 0.25)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = BRAND_SOFT; e.currentTarget.style.color = BRAND; e.currentTarget.style.boxShadow = '0 0 0 0 rgba(74, 0, 74, 0)'; }}
                    >
                      <Edit3 size={13} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    <Search size={32} color="#cbd5e1" style={{ marginBottom: '0.75rem' }} />
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: '0 0 0.25rem', color: '#64748b' }}>No records found</p>
                    <p style={{ fontSize: '0.8rem', margin: 0 }}>Try adjusting your search or filter</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.85rem 1.5rem',
          borderTop: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#fafbfc',
        }}>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
            Showing <strong style={{ color: '#475569' }}>{filtered.length}</strong> of <strong style={{ color: '#475569' }}>{STUDENTS.length}</strong> records
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#94a3b8' }}>
            <TrendingUp size={13} color="#22c55e" />
            <span>Updated just now</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <EditStudentRecordsModal
          initialMatric={editMatric}
          onClose={() => { setShowModal(false); setEditMatric(''); }}
        />
      )}
    </div>
  );
}
