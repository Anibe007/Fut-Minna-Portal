import React, { useState } from 'react';
import {
  Users, GraduationCap, TrendingUp, ArrowUpRight, ArrowDownRight,
  CreditCard, UserPlus, Download, FileText, Key, RefreshCcw,
  UserCog, ChevronRight, BarChart3, Activity, Calendar,
  CheckCircle2, Clock, AlertCircle, Sparkles, Wifi
} from 'lucide-react';
import EditStudentRecordsModal from './EditStudentRecordsModal';

const BRAND      = 'rgb(74, 0, 74)';
const BRAND_SOFT = 'rgba(74, 0, 74, 0.08)';

const STATS = [
  { label: 'Total Students',      value: '28,183', change: '+6.1%', up: true, icon: Users,          color: BRAND,     bg: BRAND_SOFT },
  { label: 'Fresh Students',      value: '10,549', change: '+12.3%', up: true, icon: UserPlus,      color: '#059669', bg: '#ecfdf5'  },
  { label: 'Online Applications', value: '244',    change: '+8.7%',  up: true, icon: GraduationCap, color: '#2563eb', bg: '#eff6ff'  },
  { label: 'Revenue Collected',   value: '₦4.2B',  change: '+3.2%',  up: true, icon: CreditCard,    color: '#d97706', bg: '#fffbeb'  },
];

const QUICK_ACTIONS = [
  { label: 'Manage Admission',     icon: GraduationCap, color: BRAND,     id: 'admission-modal' },
  { label: 'Download Images',      icon: Download,      color: '#059669', id: 'download'        },
  { label: 'Reset Password',       icon: Key,           color: '#dc2626', id: 'reset-pwd'       },
  { label: 'Reset Reg. Steps',     icon: RefreshCcw,    color: '#dc2626', id: 'reset-reg'       },
  { label: 'Login As Student',     icon: UserCog,       color: '#2563eb', id: 'login-student'   },
  { label: 'Download Data',        icon: FileText,      color: '#7c3aed', id: 'download-data'   },
];

const RECENT_ACTIVITIES = [
  { user: 'Abubakar Musa',    action: 'Completed course registration',  time: '2 min ago',  type: 'success' },
  { user: 'Fatima Aliyu',     action: 'Paid school fees — ₦150,000',    time: '15 min ago', type: 'success' },
  { user: 'Ibrahim Suleiman', action: 'Password reset requested',        time: '1 hr ago',  type: 'warning' },
  { user: 'Maryam Usman',     action: 'Application submitted (Pre-Degree)', time: '2 hr ago', type: 'info' },
  { user: 'Yusuf Abdullahi',  action: 'Acceptance fee paid — ₦25,000',  time: '3 hr ago',  type: 'success' },
];

const FACULTY_DATA = [
  { name: 'SICT',   students: 4820, pct: 62 },
  { name: 'SEET',   students: 6140, pct: 78 },
  { name: 'SET',    students: 3290, pct: 42 },
  { name: 'SIPET',  students: 2810, pct: 36 },
  { name: 'SMAT',   students: 5420, pct: 69 },
  { name: 'SSTE',   students: 5703, pct: 73 },
];

export default function AdminHome({ adminUser, onNavigatePage }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleQuickAction = (id) => {
    if (id === 'admission-modal') setShowEditModal(true);
  };

  const typeIcon = { success: CheckCircle2, warning: AlertCircle, info: Activity };
  const typeColor = {
    success: { color: '#059669', bg: '#ecfdf5' },
    warning: { color: '#d97706', bg: '#fffbeb' },
    info:    { color: '#2563eb', bg: '#eff6ff' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Welcome Banner ── */}
      <div style={{
        background: `linear-gradient(135deg, ${BRAND} 0%, rgb(120, 0, 120) 50%, rgb(90, 0, 110) 100%)`,
        borderRadius: '20px', padding: '2rem 2.25rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, left: 100, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 30, right: 200, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Wifi size={14} color="rgba(255,255,255,0.6)" />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600 }}>System Online</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px rgba(34,197,94,0.6)' }} />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff', margin: '0 0 0.35rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Welcome back, {(adminUser?.name || 'David').split(' ')[0]}! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 500 }}>
            Here's what's happening at FUT-MINNA this session. You have <strong style={{ color: '#fff' }}>7 new notifications</strong> and <strong style={{ color: '#fff' }}>16 pending messages</strong>.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigatePage?.('admission')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: '#ffffff', color: BRAND, border: 'none',
                borderRadius: '10px', padding: '0.65rem 1.25rem',
                fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25), 0 0 14px rgba(74,0,74,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
            >
              <GraduationCap size={16} />
              View Admissions
            </button>
            <button
              onClick={() => onNavigatePage?.('payment')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '10px', padding: '0.65rem 1.25rem',
                fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                backdropFilter: 'blur(6px)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <CreditCard size={16} />
              Payment Reports
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {STATS.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} style={{
              background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '16px', padding: '1.25rem 1.35rem',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              transition: 'all 0.25s ease', cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}
            >
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, margin: '0 0 0.45rem' }}>{stat.label}</p>
                <p style={{ fontSize: '1.55rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem', lineHeight: 1, letterSpacing: '-0.02em' }}>{stat.value}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {stat.up ? <ArrowUpRight size={13} color="#059669" /> : <ArrowDownRight size={13} color="#dc2626" />}
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: stat.up ? '#059669' : '#dc2626' }}>{stat.change}</span>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500 }}>vs last session</span>
                </div>
              </div>
              <div style={{
                width: 48, height: 48, borderRadius: '14px',
                background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={24} color={stat.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Quick Actions + Recent Activity ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.25rem', alignItems: 'start' }}>

        {/* Quick Actions */}
        <div style={{
          background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)',
          borderRadius: '18px', overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            padding: '1.15rem 1.5rem', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <Sparkles size={16} color={BRAND} />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>Quick Actions</h3>
          </div>
          <div style={{ padding: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {QUICK_ACTIONS.map(qa => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.id}
                    onClick={() => handleQuickAction(qa.id)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: '0.55rem', padding: '1rem 0.5rem',
                      background: '#f8f9fc', border: '1.5px solid #f1f5f9',
                      borderRadius: '12px', cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.2s ease', textAlign: 'center',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${qa.color}0a`; e.currentTarget.style.borderColor = `${qa.color}30`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 14px ${qa.color}18`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fc'; e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: '11px',
                      background: `${qa.color}14`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} color={qa.color} />
                    </div>
                    <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', lineHeight: 1.25 }}>{qa.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)',
          borderRadius: '18px', overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            padding: '1.15rem 1.5rem', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={16} color={BRAND} />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>Recent Activity</h3>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Live Feed</span>
          </div>
          <div>
            {RECENT_ACTIVITIES.map((item, i) => {
              const Icon = typeIcon[item.type];
              const tc   = typeColor[item.type];
              return (
                <div key={i} style={{
                  padding: '0.95rem 1.5rem',
                  borderBottom: i < RECENT_ACTIVITIES.length - 1 ? '1px solid #f8fafc' : 'none',
                  display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '10px',
                    background: tc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={17} color={tc.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.15rem' }}>
                      {item.user}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>{item.action}</p>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap', paddingTop: '0.15rem' }}>{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Faculty Distribution + Population Card ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem', alignItems: 'start' }}>

        {/* Faculty Distribution */}
        <div style={{
          background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)',
          borderRadius: '18px', overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            padding: '1.15rem 1.5rem', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <BarChart3 size={16} color={BRAND} />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>Faculty Distribution</h3>
          </div>
          <div style={{ padding: '1rem 1.5rem' }}>
            {FACULTY_DATA.map((f, i) => (
              <div key={f.name} style={{ marginBottom: i < FACULTY_DATA.length - 1 ? '0.85rem' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>{f.name}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{f.students.toLocaleString()} students</span>
                </div>
                <div style={{ width: '100%', height: 8, background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${f.pct}%`, height: '100%',
                    background: `linear-gradient(90deg, ${BRAND} 0%, rgb(120, 0, 120) 100%)`,
                    borderRadius: '999px',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Population Summary */}
        <div style={{
          background: `linear-gradient(135deg, ${BRAND} 0%, rgb(110, 0, 110) 100%)`,
          borderRadius: '18px', padding: '1.75rem',
          position: 'relative', overflow: 'hidden',
          color: '#fff',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', margin: '0 0 0.75rem' }}>
            Total Population This Session
          </p>
          <p style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 0.35rem', letterSpacing: '-0.03em', lineHeight: 1, fontFamily: 'var(--font-display)' }}>
            28,183
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
            <ArrowUpRight size={15} color="#22c55e" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#22c55e' }}>+6.1%</span>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>vs 2024/2025</span>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0.85rem 1rem',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 0.15rem', fontWeight: 600 }}>Last Session</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>26,568</p>
              </div>
              <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />
              <div>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 0.15rem', fontWeight: 600 }}>Growth</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>+1,615</p>
              </div>
              <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />
              <div>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 0.15rem', fontWeight: 600 }}>Target</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>30,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Student Records Modal */}
      {showEditModal && (
        <EditStudentRecordsModal onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
}
