import React, { useState } from 'react';
import {
  GraduationCap, BookOpen, CreditCard, Bell, LogOut,
  Home, FileText, User, Menu, X, Sparkles,
  CheckCircle2, Clock, AlertCircle, TrendingUp,
  Calendar, Award, ChevronRight, Wifi, Shield,
  ArrowUpRight, BarChart3, Download, Eye, Printer,
  Mail, Search, ChevronDown, Activity, Receipt
} from 'lucide-react';

const BRAND      = 'rgb(74, 0, 74)';
const BRAND_SOFT = 'rgba(74, 0, 74, 0.08)';

const STUDENT = {
  name:       'David Anibe Daniel',
  matric:     'FUT/2025/007',
  course:     'B.Tech. Computer Science',
  level:      '100 Level',
  department: 'School of Information & Comm. Tech (SICT)',
  session:    '2025/2026',
  status:     'Admitted',
  cgpa:       '4.72',
  credits:    '32',
  phone:      '+234 803 456 7890',
  email:      'd.anibe@student.futminna.edu.ng',
  stateOrigin:'Niger State',
  gender:     'Male',
  dob:        '2003-05-12',
  lga:        'Bosso',
  bloodGroup: 'O+',
  guardian:   'Mr. Daniel Anibe',
  guardianPhone: '+234 801 234 5678',
};

const ANNOUNCEMENTS = [
  { id: 1, type: 'info',    title: '2025/2026 School Fees Deadline',    body: 'School fees payment deadline is extended to October 31, 2025. Ensure payment via Remita.',          time: '2h ago' },
  { id: 2, type: 'success', title: 'Course Registration Open',          body: '100L course registration for 2025/2026 session is now open. Register before the deadline.',         time: '1d ago' },
  { id: 3, type: 'warning', title: 'Medical Screening Reminder',        body: 'All fresh students must complete medical screening at the University clinic before Oct 20.',        time: '3d ago' },
  { id: 4, type: 'info',    title: 'Orientation Week Schedule Released', body: 'Orientation activities commence Nov 3–7, 2025. Check your departmental notice board for details.', time: '5d ago' },
];

const COURSES = [
  { code: 'CSC 101', title: 'Introduction to Computer Science',  units: 3, grade: 'A',  score: 85, status: 'Registered' },
  { code: 'MTH 101', title: 'Elementary Mathematics I',          units: 3, grade: 'A',  score: 82, status: 'Registered' },
  { code: 'GST 101', title: 'Use of English & Communication',   units: 2, grade: 'B+', score: 76, status: 'Registered' },
  { code: 'PHY 101', title: 'General Physics I',                units: 3, grade: 'A',  score: 88, status: 'Registered' },
  { code: 'CSC 103', title: 'Introduction to Programming',      units: 3, grade: 'A+', score: 94, status: 'Registered' },
  { code: 'CHM 101', title: 'General Chemistry I',              units: 3, grade: 'B+', score: 74, status: 'Registered' },
  { code: 'GST 103', title: 'Nigerian Peoples & Culture',       units: 2, grade: 'A',  score: 80, status: 'Registered' },
  { code: 'PHY 107', title: 'General Physics Lab I',            units: 1, grade: 'A',  score: 90, status: 'Registered' },
];

const PAYMENTS = [
  { id: 'TXN-001', desc: 'Acceptance Fee',        amount: '₦25,000',  date: 'Sep 01, 2025', status: 'Paid',    method: 'Remita' },
  { id: 'TXN-002', desc: 'School Fees 2025/2026', amount: '₦150,000', date: 'Sep 14, 2025', status: 'Paid',    method: 'Remita' },
  { id: 'TXN-003', desc: 'Sports & Health Levy',  amount: '₦5,000',   date: 'Sep 14, 2025', status: 'Paid',    method: 'Remita' },
  { id: 'TXN-004', desc: 'ICT Levy',              amount: '₦10,000',  date: 'Sep 14, 2025', status: 'Paid',    method: 'Remita' },
  { id: 'TXN-005', desc: 'Library Dues',          amount: '₦2,500',   date: '—',            status: 'Pending', method: '—' },
  { id: 'TXN-006', desc: 'Dept. Dues (SICT)',     amount: '₦3,500',   date: '—',            status: 'Pending', method: '—' },
];

const NAV = [
  { id: 'home',     label: 'Dashboard',  icon: Home },
  { id: 'courses',  label: 'My Courses', icon: BookOpen },
  { id: 'payments', label: 'Payments',   icon: CreditCard },
  { id: 'results',  label: 'Results',    icon: BarChart3 },
  { id: 'profile',  label: 'Profile',    icon: User },
];

const PAGE_TITLES = {
  home:     { title: 'Dashboard',  sub: 'Your academic overview at a glance' },
  courses:  { title: 'My Courses', sub: 'Registered courses for 2025/2026 session' },
  payments: { title: 'Payments',   sub: 'Fee history & outstanding balances' },
  results:  { title: 'Results',    sub: 'Academic performance & transcripts' },
  profile:  { title: 'Profile',    sub: 'Personal & academic information' },
};

function StatusBadge({ status }) {
  const map = {
    Admitted:   { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
    Registered: { bg: '#dbeafe', color: '#1e40af', dot: '#3b82f6' },
    Paid:       { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
    Pending:    { bg: '#fef9c3', color: '#854d0e', dot: '#eab308' },
  };
  const s = map[status] || map['Pending'];
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

function GradeBadge({ grade }) {
  const colors = {
    'A+': { bg: '#dcfce7', color: '#15803d' },
    'A':  { bg: '#dcfce7', color: '#15803d' },
    'B+': { bg: '#dbeafe', color: '#1e40af' },
    'B':  { bg: '#dbeafe', color: '#1e40af' },
    'C':  { bg: '#fef9c3', color: '#854d0e' },
  };
  const c = colors[grade] || colors['C'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: c.bg, color: c.color,
      width: 32, height: 24, borderRadius: '6px',
      fontSize: '0.72rem', fontWeight: 800,
    }}>{grade}</span>
  );
}

function InfoRow({ label, value, icon: Icon }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.7rem 0', borderBottom: '1px solid #f1f5f9',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {Icon && <Icon size={14} color="#94a3b8" />}
        <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>{label}</span>
      </div>
      <span style={{ fontSize: '0.84rem', color: '#1e293b', fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
    </div>
  );
}

export default function StudentDashboard({ studentName = 'David Anibe', onLogout }) {
  const [activePage, setActivePage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageInfo = PAGE_TITLES[activePage] || PAGE_TITLES['home'];
  const notifType = {
    info:    { color: '#3b82f6', bg: '#eff6ff', icon: Bell },
    success: { color: '#22c55e', bg: '#f0fdf4', icon: CheckCircle2 },
    warning: { color: '#f59e0b', bg: '#fffbeb', icon: AlertCircle },
  };

  const totalPaid = 190000;
  const totalOwed = 6000;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f1f3f8', fontFamily: 'var(--font-body, Inter, sans-serif)', overflow: 'hidden' }}>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(10,0,20,0.55)', zIndex: 40, backdropFilter: 'blur(4px)' }} />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 260, flexShrink: 0,
        background: BRAND,
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        boxShadow: '4px 0 30px rgba(74,0,74,0.2)',
      }}>
        {/* Decorative bg */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 40, left: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

        {/* Brand */}
        <div style={{ padding: '1.5rem 1.25rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <GraduationCap size={22} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, color: '#fff' }}>FUT-MINNA</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.68rem', margin: 0 }}>Student Portal</p>
            </div>
          </div>
        </div>

        {/* Student profile card */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.05rem', fontWeight: 800, color: '#fff',
              border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0,
            }}>DA</div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: '0.85rem', margin: 0, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {STUDENT.name}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', margin: '0.1rem 0 0' }}>{STUDENT.matric}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.62rem', fontWeight: 600 }}>Active Student</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.85rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 0.5rem', marginBottom: '0.35rem' }}>
            Navigation
          </p>
          {NAV.map(item => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setSidebarOpen(false); }}
                style={{
                  position: 'relative', display: 'flex', alignItems: 'center', gap: '0.7rem',
                  padding: '0.75rem 0.85rem', borderRadius: '10px', border: 'none',
                  background: active ? 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                  fontWeight: active ? 700 : 500, fontSize: '0.875rem',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}}
              >
                {active && <div style={{ position: 'absolute', left: -12, top: '50%', transform: 'translateY(-50%)', width: 4, height: 24, borderRadius: '0 4px 4px 0', background: '#22c55e', boxShadow: '0 0 12px rgba(34,197,94,0.5)' }} />}
                <div style={{ width: 32, height: 32, borderRadius: '8px', background: active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  <Icon size={16} />
                </div>
                <span style={{ flex: 1 }}>{item.label}</span>
                {!active && <ChevronRight size={13} style={{ opacity: 0.4 }} />}
              </button>
            );
          })}
        </nav>

        {/* CGPA card */}
        <div style={{ padding: '0 1rem 0.75rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '0.75rem 0.85rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Current CGPA</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0.1rem 0 0', color: '#fff' }}>{STUDENT.cgpa}</p>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={20} color="#22c55e" />
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div style={{ padding: '0 0.75rem 1rem' }}>
          <button
            onClick={onLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              background: 'rgba(239,68,68,0.12)', color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(239,68,68,0.15)',
              padding: '0.65rem 0.85rem', borderRadius: '10px', width: '100%',
              cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, fontFamily: 'inherit',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.25)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Top Bar */}
        <header style={{
          background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '0 2rem', height: 68, display: 'flex', alignItems: 'center', gap: '1rem',
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)', flexShrink: 0, zIndex: 10,
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: BRAND, color: '#fff', border: 'none', borderRadius: '9px', padding: '0.45rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(74,0,74,0.25)',
          }}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>{pageInfo.title}</h1>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>{pageInfo.sub}</p>
          </div>

          {/* Notification */}
          <div style={{ position: 'relative', width: 40, height: 40, borderRadius: '11px', background: '#f8f9fc', border: '1px solid #e8ecf2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = BRAND_SOFT; e.currentTarget.style.borderColor = 'rgba(74,0,74,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fc'; e.currentTarget.style.borderColor = '#e8ecf2'; }}
          >
            <Bell size={17} color="#64748b" />
            <span style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '0.62rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 2px 6px rgba(239,68,68,0.35)' }}>4</span>
          </div>

          <div style={{ width: 1, height: 32, background: '#e8ecf2' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.3rem 0.5rem', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8f9fc'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ width: 36, height: 36, borderRadius: '10px', background: `linear-gradient(135deg, ${BRAND}, rgb(120,0,120))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, color: '#fff', boxShadow: '0 2px 8px rgba(74,0,74,0.25)' }}>DA</div>
            <div style={{ lineHeight: 1.2 }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>David Anibe</p>
              <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>{STUDENT.matric}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '1.75rem 2rem' }}>

          {/* ════════════ HOME ════════════ */}
          {activePage === 'home' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Welcome Banner */}
              <div style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, rgb(120,0,120) 50%, rgb(90,0,110) 100%)`,
                borderRadius: '20px', padding: '2rem 2.25rem', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -30, left: 100, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Wifi size={14} color="rgba(255,255,255,0.6)" />
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 600 }}>Portal Active</span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px rgba(34,197,94,0.6)' }} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: '0 0 0.35rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                    Welcome back, David! 👋
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', margin: '0 0 1.5rem', maxWidth: 550 }}>
                    {STUDENT.course} · {STUDENT.level} · {STUDENT.session} Session
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {[
                      { label: 'CGPA', value: STUDENT.cgpa, icon: Award, col: '#22c55e' },
                      { label: 'Credits', value: STUDENT.credits, icon: BookOpen, col: '#3b82f6' },
                      { label: 'Status', value: STUDENT.status, icon: Shield, col: '#f59e0b' },
                    ].map(s => {
                      const I = s.icon;
                      return (
                        <div key={s.label} style={{
                          display: 'flex', alignItems: 'center', gap: '0.6rem',
                          background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)',
                          borderRadius: '10px', padding: '0.6rem 1.1rem',
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}>
                          <I size={16} color={s.col} />
                          <div>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.62rem', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
                            <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>{s.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Register Courses', icon: BookOpen,   color: BRAND,     action: 'courses' },
                  { label: 'Pay School Fees',  icon: CreditCard, color: '#059669', action: 'payments' },
                  { label: 'View Results',     icon: BarChart3,  color: '#2563eb', action: 'results' },
                  { label: 'My Profile',       icon: User,       color: '#7c3aed', action: 'profile' },
                ].map(qa => {
                  const I = qa.icon;
                  return (
                    <button key={qa.label} onClick={() => setActivePage(qa.action)} style={{
                      background: '#fff', border: '1px solid rgba(0,0,0,0.05)',
                      borderRadius: '14px', padding: '1.15rem',
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem',
                      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.1), 0 0 14px ${qa.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${qa.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <I size={22} color={qa.color} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{qa.label}</span>
                        <ChevronRight size={14} color="#94a3b8" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Courses Registered', value: COURSES.length.toString(), color: BRAND, bg: BRAND_SOFT, icon: BookOpen },
                  { label: 'Total Units',        value: COURSES.reduce((a,c)=>a+c.units,0).toString(), color: '#2563eb', bg: '#eff6ff', icon: BarChart3 },
                  { label: 'Total Paid',          value: '₦190K', color: '#059669', bg: '#ecfdf5', icon: CheckCircle2 },
                  { label: 'Outstanding',         value: '₦6,000', color: '#d97706', bg: '#fffbeb', icon: Clock },
                ].map(s => {
                  const I = s.icon;
                  return (
                    <div key={s.label} style={{
                      background: '#fff', border: '1px solid rgba(0,0,0,0.05)',
                      borderRadius: '16px', padding: '1.2rem 1.3rem',
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)', transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}
                    >
                      <div>
                        <p style={{ fontSize: '0.73rem', color: '#64748b', fontWeight: 600, margin: '0 0 0.4rem' }}>{s.label}</p>
                        <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1 }}>{s.value}</p>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <I size={22} color={s.color} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Announcements */}
              <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bell size={16} color={BRAND} />
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>Announcements</h3>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>{ANNOUNCEMENTS.length} new</span>
                </div>
                {ANNOUNCEMENTS.map((a, i) => {
                  const t = notifType[a.type];
                  const Icon = t.icon;
                  return (
                    <div key={a.id} style={{
                      padding: '1rem 1.5rem', borderBottom: i < ANNOUNCEMENTS.length - 1 ? '1px solid #f8fafc' : 'none',
                      display: 'flex', gap: '0.85rem', alignItems: 'flex-start', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: '10px', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={17} color={t.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.87rem', margin: '0 0 0.2rem' }}>{a.title}</p>
                        <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 0.25rem', lineHeight: 1.5 }}>{a.body}</p>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{a.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════════ COURSES ════════════ */}
          {activePage === 'courses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '1.15rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={17} color={BRAND} />
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>Registered Courses — {STUDENT.session}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ background: BRAND_SOFT, color: BRAND, borderRadius: '8px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 700 }}>
                      {COURSES.reduce((a,c) => a + c.units, 0)} Units
                    </span>
                    <span style={{ background: '#ecfdf5', color: '#059669', borderRadius: '8px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 700 }}>
                      {COURSES.length} Courses
                    </span>
                  </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.855rem' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fc' }}>
                        {['Code', 'Course Title', 'Units', 'Score', 'Grade', 'Status'].map(h => (
                          <th key={h} style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.71rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COURSES.map((c, i) => (
                        <tr key={c.code}
                          style={{ borderTop: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafbfc', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,0,74,0.02)'}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafbfc'}
                        >
                          <td style={{ padding: '0.9rem 1.25rem', fontFamily: 'monospace', fontWeight: 700, color: BRAND, fontSize: '0.82rem' }}>{c.code}</td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 600, color: '#1e293b' }}>{c.title}</td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 800, color: '#0f172a', textAlign: 'center' }}>{c.units}</td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 700, color: '#475569', textAlign: 'center' }}>{c.score}</td>
                          <td style={{ padding: '0.9rem 1.25rem', textAlign: 'center' }}><GradeBadge grade={c.grade} /></td>
                          <td style={{ padding: '0.9rem 1.25rem' }}><StatusBadge status={c.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: '0.85rem 1.5rem', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
                    Total: <strong style={{ color: '#475569' }}>{COURSES.length}</strong> courses · <strong style={{ color: '#475569' }}>{COURSES.reduce((a,c)=>a+c.units,0)}</strong> credit units
                  </p>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: BRAND_SOFT, color: BRAND, border: `1px solid rgba(74,0,74,0.15)`,
                    borderRadius: '8px', padding: '0.4rem 0.85rem',
                    fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = BRAND; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = BRAND_SOFT; e.currentTarget.style.color = BRAND; }}
                  >
                    <Printer size={13} /> Print Course Form
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════════════ PAYMENTS ════════════ */}
          {activePage === 'payments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Total Paid',    value: '₦190,000', color: '#059669', bg: '#ecfdf5', icon: CheckCircle2 },
                  { label: 'Outstanding',   value: '₦6,000',   color: '#d97706', bg: '#fffbeb', icon: Clock },
                  { label: 'Transactions',  value: PAYMENTS.length.toString(), color: BRAND, bg: BRAND_SOFT, icon: Receipt },
                ].map(s => {
                  const I = s.icon;
                  return (
                    <div key={s.label} style={{
                      background: '#fff', border: '1px solid rgba(0,0,0,0.05)',
                      borderRadius: '16px', padding: '1.2rem 1.3rem',
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)', transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}
                    >
                      <div>
                        <p style={{ fontSize: '0.73rem', color: '#64748b', fontWeight: 600, margin: '0 0 0.4rem' }}>{s.label}</p>
                        <p style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1 }}>{s.value}</p>
                      </div>
                      <div style={{ width: 44, height: 44, borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <I size={22} color={s.color} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>Payment History</h3>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: BRAND_SOFT, color: BRAND, border: `1px solid rgba(74,0,74,0.15)`,
                    borderRadius: '8px', padding: '0.4rem 0.85rem',
                    fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    <Download size={13} /> Export
                  </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.855rem' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fc' }}>
                        {['Txn ID', 'Description', 'Amount', 'Date', 'Method', 'Status'].map(h => (
                          <th key={h} style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.71rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAYMENTS.map((p, i) => (
                        <tr key={p.id}
                          style={{ borderTop: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafbfc', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,0,74,0.02)'}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafbfc'}
                        >
                          <td style={{ padding: '0.9rem 1.25rem', fontFamily: 'monospace', fontWeight: 700, color: BRAND, fontSize: '0.8rem' }}>{p.id}</td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 700, color: '#1e293b' }}>{p.desc}</td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 800, color: '#0f172a' }}>{p.amount}</td>
                          <td style={{ padding: '0.9rem 1.25rem', color: '#64748b', whiteSpace: 'nowrap' }}>{p.date}</td>
                          <td style={{ padding: '0.9rem 1.25rem', color: '#475569', fontWeight: 600 }}>{p.method}</td>
                          <td style={{ padding: '0.9rem 1.25rem' }}><StatusBadge status={p.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ════════════ RESULTS ════════════ */}
          {activePage === 'results' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* CGPA Banner */}
              <div style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, rgb(110,0,110) 100%)`,
                borderRadius: '18px', padding: '2rem', position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', color: '#fff',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', margin: '0 0 0.5rem' }}>
                    Cumulative GPA
                  </p>
                  <p style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, letterSpacing: '-0.03em', lineHeight: 1, fontFamily: 'var(--font-display)' }}>
                    {STUDENT.cgpa}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', margin: '0.5rem 0 0' }}>
                    First Class Honours Standing
                  </p>
                </div>
                <div style={{ width: 1, height: 80, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Total Credits', value: STUDENT.credits },
                    { label: 'Courses', value: COURSES.length.toString() },
                    { label: 'Highest Score', value: '94' },
                    { label: 'Average', value: '83.6' },
                  ].map(s => (
                    <div key={s.label}>
                      <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 0.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
                      <p style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results table */}
              <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BarChart3 size={16} color={BRAND} />
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>First Semester Results — {STUDENT.session}</h3>
                  </div>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: '#059669', color: '#fff', border: 'none',
                    borderRadius: '8px', padding: '0.45rem 0.9rem',
                    fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: '0 2px 8px rgba(5,150,105,0.3)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(5,150,105,0.45)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(5,150,105,0.3)'}
                  >
                    <Download size={13} /> Download Transcript
                  </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.855rem' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fc' }}>
                        {['Code', 'Course Title', 'Units', 'Score', 'Grade', 'Remark'].map(h => (
                          <th key={h} style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.71rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COURSES.map((c, i) => (
                        <tr key={c.code} style={{ borderTop: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafbfc', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,0,74,0.02)'}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafbfc'}
                        >
                          <td style={{ padding: '0.9rem 1.25rem', fontFamily: 'monospace', fontWeight: 700, color: BRAND }}>{c.code}</td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 600, color: '#1e293b' }}>{c.title}</td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 800, textAlign: 'center' }}>{c.units}</td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 700, textAlign: 'center', color: c.score >= 70 ? '#059669' : '#d97706' }}>{c.score}</td>
                          <td style={{ padding: '0.9rem 1.25rem', textAlign: 'center' }}><GradeBadge grade={c.grade} /></td>
                          <td style={{ padding: '0.9rem 1.25rem', fontWeight: 600, color: '#059669' }}>Pass</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ════════════ PROFILE ════════════ */}
          {activePage === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 700 }}>
              {/* Profile hero */}
              <div style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, rgb(110,0,120) 100%)`,
                borderRadius: '20px', padding: '2rem 2.25rem',
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
                <div style={{
                  width: 80, height: 80, borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', fontWeight: 800, color: '#fff',
                  border: '3px solid rgba(255,255,255,0.25)', flexShrink: 0,
                }}>DA</div>
                <div style={{ position: 'relative' }}>
                  <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.35rem', margin: '0 0 0.3rem', fontFamily: 'var(--font-display)' }}>{STUDENT.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '0 0 0.65rem' }}>{STUDENT.matric} · {STUDENT.level}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <StatusBadge status={STUDENT.status} />
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '0.22rem 0.7rem', borderRadius: '999px', fontSize: '0.73rem', fontWeight: 700 }}>
                      <Award size={11} /> CGPA {STUDENT.cgpa}
                    </span>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: BRAND, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <GraduationCap size={15} color={BRAND} /> Academic Information
                </h3>
                <InfoRow icon={FileText} label="Full Name" value={STUDENT.name} />
                <InfoRow icon={FileText} label="Matric No." value={STUDENT.matric} />
                <InfoRow icon={BookOpen} label="Programme" value={STUDENT.course} />
                <InfoRow icon={Shield}   label="Department" value={STUDENT.department} />
                <InfoRow icon={BarChart3} label="Level" value={STUDENT.level} />
                <InfoRow icon={Calendar} label="Session" value={STUDENT.session} />
                <InfoRow icon={Award}    label="CGPA" value={STUDENT.cgpa} />
              </div>

              {/* Personal Info */}
              <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: BRAND, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={15} color={BRAND} /> Personal Information
                </h3>
                <InfoRow icon={Mail}     label="Email" value={STUDENT.email} />
                <InfoRow icon={FileText} label="Phone" value={STUDENT.phone} />
                <InfoRow icon={User}     label="Gender" value={STUDENT.gender} />
                <InfoRow icon={Calendar} label="Date of Birth" value={STUDENT.dob} />
                <InfoRow icon={FileText} label="State of Origin" value={STUDENT.stateOrigin} />
                <InfoRow icon={FileText} label="LGA" value={STUDENT.lga} />
                <InfoRow icon={Activity} label="Blood Group" value={STUDENT.bloodGroup} />
              </div>

              {/* Guardian */}
              <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.05)', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: BRAND, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Shield size={15} color={BRAND} /> Guardian / Sponsor
                </h3>
                <InfoRow icon={User}     label="Guardian Name" value={STUDENT.guardian} />
                <InfoRow icon={FileText} label="Guardian Phone" value={STUDENT.guardianPhone} />
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
