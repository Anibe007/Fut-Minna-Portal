import React, { useState } from 'react';
import {
  Search, CheckCircle2, X, AlertCircle, User, BookOpen,
  GraduationCap, Calendar, Building2, Hash, Shield, Save,
  Edit3, Loader2, ChevronDown, Sparkles, FileText
} from 'lucide-react';

const BRAND = 'rgb(74, 0, 74)';
const BRAND_LIGHT = 'rgba(74, 0, 74, 0.08)';
const BRAND_MID   = 'rgba(74, 0, 74, 0.18)';

const INITIAL_MOCK_STUDENTS = {
  'FUT/2025/001': {
    name: 'Abubakar Musa',         matric: 'FUT/2025/001',
    course: 'B.Tech. Computer Science', level: '100L',
    session: '2025/2026',          status: 'Admitted',
    department: 'School of Information & Comm. Tech (SICT)',
    email: 'a.musa@student.futminna.edu.ng',
    phone: '+234 801 234 5678',
    gender: 'Male',                dob: '2003-05-12',
    stateOfOrigin: 'Niger',        jambScore: '278',
  },
  'FUT/2025/002': {
    name: 'Fatima Aliyu',          matric: 'FUT/2025/002',
    course: 'B.Tech. Electrical Engineering', level: '200L',
    session: '2025/2026',          status: 'Admitted',
    department: 'School of Engineering & Tech (SEET)',
    email: 'f.aliyu@student.futminna.edu.ng',
    phone: '+234 803 456 7890',
    gender: 'Female',              dob: '2002-11-20',
    stateOfOrigin: 'Kwara',        jambScore: '291',
  },
  'FUT/2025/003': {
    name: 'Ibrahim Suleiman',      matric: 'FUT/2025/003',
    course: 'B.Tech. Civil Engineering', level: '300L',
    session: '2025/2026',          status: 'Provisional',
    department: 'School of Engineering & Tech (SEET)',
    email: 'i.suleiman@student.futminna.edu.ng',
    phone: '+234 805 678 9012',
    gender: 'Male',                dob: '2001-07-08',
    stateOfOrigin: 'Kogi',         jambScore: '264',
  },
};

const DEPARTMENTS = [
  'School of Information & Comm. Tech (SICT)',
  'School of Engineering & Tech (SEET)',
  'School of Environmental Tech (SET)',
  'School of Infrastructure, Process Engineering & Tech (SIPET)',
  'School of Management Technology (SMAT)',
  'School of Science & Technology Education (SSTE)',
  'Postgraduate School',
];

const COURSES = [
  'B.Tech. Computer Science',
  'B.Tech. Electrical Engineering',
  'B.Tech. Civil Engineering',
  'B.Tech. Mechanical Engineering',
  'B.Tech. Agricultural Engineering',
  'B.Tech. Chemical Engineering',
  'B.Tech. Biochemistry',
  'B.Tech. Mathematics & Statistics',
  'B.Tech. Business Administration',
];

const SESSIONS = ['2025/2026', '2024/2025', '2023/2024', '2022/2023'];
const LEVELS   = ['100L', '200L', '300L', '400L', '500L', 'PGD', 'MSc', 'PhD'];
const STATUSES = ['Admitted', 'Provisional', 'Deferred', 'Pending', 'Suspended', 'Graduated'];

function statusBadge(status) {
  const map = {
    Admitted:    { bg: '#dcfce7', color: '#15803d', dot: '#22c55e' },
    Provisional: { bg: '#fef9c3', color: '#854d0e', dot: '#eab308' },
    Deferred:    { bg: '#ffe4e6', color: '#9f1239', dot: '#f43f5e' },
    Pending:     { bg: '#dbeafe', color: '#1e40af', dot: '#3b82f6' },
    Suspended:   { bg: '#fee2e2', color: '#991b1b', dot: '#ef4444' },
    Graduated:   { bg: '#ede9fe', color: '#5b21b6', dot: '#8b5cf6' },
  };
  const s = map[status] || map['Pending'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      background: s.bg, color: s.color,
      padding: '0.25rem 0.75rem', borderRadius: '999px',
      fontSize: '0.75rem', fontWeight: 700,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
}

function FieldGroup({ icon: Icon, label, children, span = 1 }) {
  return (
    <div style={{ gridColumn: `span ${span}` }}>
      <label style={{
        display: 'flex', alignItems: 'center', gap: '0.35rem',
        fontSize: '0.73rem', fontWeight: 700, color: '#64748b',
        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem',
      }}>
        {Icon && <Icon size={12} color={BRAND} />}
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '0.62rem 0.85rem',
  borderRadius: '8px', border: '1.5px solid #e2e8f0',
  background: '#f8fafc', fontSize: '0.875rem', fontWeight: 600,
  color: '#1e293b', outline: 'none', fontFamily: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

export default function EditStudentRecordsModal({ onClose, initialMatric = '' }) {
  const [matricInput, setMatricInput] = useState(initialMatric || 'FUT/2025/001');
  const [studentData, setStudentData] = useState(null);
  const [mockDb, setMockDb]           = useState(INITIAL_MOCK_STUDENTS);
  const [searching, setSearching]     = useState(false);
  const [notFound, setNotFound]       = useState(false);
  const [isEditing, setIsEditing]     = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab]     = useState('personal');

  const [form, setForm] = useState({
    name: '', matric: '', course: '', level: '100L',
    status: 'Admitted', department: '', session: '2025/2026',
    email: '', phone: '', gender: 'Male', dob: '', stateOfOrigin: '', jambScore: '',
  });

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!matricInput.trim()) return;
    setSearching(true);
    setNotFound(false);
    setSavedSuccess(false);

    setTimeout(() => {
      const key   = matricInput.trim().toUpperCase();
      const match = mockDb[key] || mockDb[matricInput.trim()];
      if (match) {
        setStudentData(match);
        setForm({ ...match });
        setIsEditing(true);
        setNotFound(false);
      } else {
        const newRecord = {
          name: '',               matric: matricInput.trim().toUpperCase(),
          course: COURSES[0],     level: '100L',
          session: '2025/2026',   status: 'Admitted',
          department: DEPARTMENTS[0],
          email: '',              phone: '',
          gender: 'Male',         dob: '',
          stateOfOrigin: '',      jambScore: '',
        };
        setStudentData(newRecord);
        setForm(newRecord);
        setIsEditing(true);
        setNotFound(true);
      }
      setSearching(false);
    }, 700);
  };

  const handleSave = () => {
    setMockDb(prev => ({ ...prev, [form.matric]: { ...form } }));
    setStudentData({ ...form });
    setSavedSuccess(true);
    setNotFound(false);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const tabs = [
    { id: 'personal',  label: 'Personal',  icon: User },
    { id: 'academic',  label: 'Academic',  icon: GraduationCap },
    { id: 'contact',   label: 'Contact',   icon: FileText },
  ];

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
          width: '100%', maxWidth: '640px',
          background: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px -12px rgba(74, 0, 74, 0.35), 0 0 0 1px rgba(74,0,74,0.08)',
          display: 'flex', flexDirection: 'column',
          maxHeight: '92vh',
        }}
      >
        {/* ── HEADER ── */}
        <div style={{
          background: `linear-gradient(135deg, rgb(74, 0, 74) 0%, rgb(120, 0, 120) 60%, rgb(74, 0, 74) 100%)`,
          padding: '1.5rem 1.75rem',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Background circles */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '12px',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}>
                <Edit3 size={22} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                  Student Records Management
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', margin: '0.1rem 0 0' }}>
                  Search, view & edit admission data
                </p>
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

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block', fontSize: '0.78rem', fontWeight: 700,
              color: BRAND, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.55rem',
            }}>
              Student ID / Matriculation Number
            </label>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Hash size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="e.g. FUT/2025/001"
                  value={matricInput}
                  onChange={e => setMatricInput(e.target.value)}
                  style={{
                    ...inputStyle,
                    paddingLeft: '2.4rem',
                    border: '1.5px solid #cbd5e1',
                    background: '#f8fafc',
                  }}
                  onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND_MID}`; }}
                  onBlur={e => { e.target.style.borderColor = '#cbd5e1'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <button
                type="submit"
                disabled={searching}
                style={{
                  background: BRAND, color: '#fff', border: 'none', borderRadius: '10px',
                  padding: '0 1.4rem', fontWeight: 800, fontSize: '0.875rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  boxShadow: `0 4px 15px rgba(74, 0, 74, 0.35), 0 0 0 0 ${BRAND}`,
                  transition: 'all 0.25s ease', whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 20px rgba(74, 0, 74, 0.55), 0 0 16px rgba(74, 0, 74, 0.4)`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 15px rgba(74, 0, 74, 0.35)`; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {searching ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={16} />}
                {searching ? 'Searching…' : 'Find Record'}
              </button>
            </div>
          </form>

          {/* Not-found notice */}
          {notFound && isEditing && (
            <div style={{
              background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '10px',
              padding: '0.75rem 1rem', marginBottom: '1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <AlertCircle size={16} color="#d97706" />
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#92400e' }}>
                No existing record found. You can fill in the details below to create a new record.
              </span>
            </div>
          )}

          {/* Success banner */}
          {savedSuccess && (
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
              border: '1px solid #6ee7b7', borderRadius: '10px',
              padding: '0.75rem 1rem', marginBottom: '1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              animation: 'fadeIn 0.3s ease',
            }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={16} color="#16a34a" />
              </div>
              <div>
                <p style={{ fontSize: '0.825rem', fontWeight: 800, color: '#166534', margin: 0 }}>Record updated successfully!</p>
                <p style={{ fontSize: '0.75rem', color: '#15803d', margin: 0 }}>Changes saved for {form.name || form.matric}</p>
              </div>
            </div>
          )}

          {/* ── STUDENT CARD + EDIT FORM ── */}
          {isEditing && studentData && (
            <div>
              {/* Student profile card */}
              <div style={{
                background: `linear-gradient(135deg, ${BRAND_LIGHT} 0%, rgba(74,0,74,0.04) 100%)`,
                border: `1.5px solid ${BRAND_MID}`,
                borderRadius: '14px', padding: '1.1rem 1.25rem',
                marginBottom: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '14px',
                  background: `linear-gradient(135deg, ${BRAND} 0%, rgb(120, 0, 120) 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', fontWeight: 800, color: '#fff', flexShrink: 0,
                }}>
                  {(studentData.name || '?')[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: '#1e0538', margin: 0 }}>
                      {studentData.name || '— New Record —'}
                    </p>
                    {statusBadge(studentData.status)}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.15rem 0 0', fontWeight: 600 }}>
                    {studentData.matric} · {studentData.course}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.8)', borderRadius: '8px', padding: '0.3rem 0.7rem' }}>
                  <Sparkles size={13} color={BRAND} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: BRAND }}>Live Edit</span>
                </div>
              </div>

              {/* Tab nav */}
              <div style={{
                display: 'flex', gap: '0.25rem',
                background: '#f1f5f9', borderRadius: '10px',
                padding: '0.25rem', marginBottom: '1.25rem',
              }}>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.4rem', padding: '0.55rem 0.5rem',
                        borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        fontSize: '0.82rem', fontWeight: 700,
                        background: active ? '#ffffff' : 'transparent',
                        color: active ? BRAND : '#64748b',
                        boxShadow: active ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* ── Personal Tab ── */}
              {activeTab === 'personal' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <FieldGroup icon={User} label="Full Name" span={2}>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND_MID}`; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
                    />
                  </FieldGroup>
                  <FieldGroup icon={User} label="Gender">
                    <div style={{ position: 'relative' }}>
                      <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                        style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem' }}>
                        {['Male', 'Female', 'Prefer not to say'].map(g => <option key={g}>{g}</option>)}
                      </select>
                      <ChevronDown size={14} color="#94a3b8" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </FieldGroup>
                  <FieldGroup icon={Calendar} label="Date of Birth">
                    <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND_MID}`; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
                    />
                  </FieldGroup>
                  <FieldGroup icon={Building2} label="State of Origin" span={2}>
                    <input type="text" value={form.stateOfOrigin} onChange={e => setForm({ ...form, stateOfOrigin: e.target.value })}
                      placeholder="e.g. Niger" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND_MID}`; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
                    />
                  </FieldGroup>
                </div>
              )}

              {/* ── Academic Tab ── */}
              {activeTab === 'academic' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <FieldGroup icon={Hash} label="Matric Number" span={2}>
                    <input type="text" value={form.matric} onChange={e => setForm({ ...form, matric: e.target.value })}
                      style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '0.04em' }}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND_MID}`; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
                    />
                  </FieldGroup>
                  <FieldGroup icon={BookOpen} label="Programme / Course" span={2}>
                    <div style={{ position: 'relative' }}>
                      <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
                        style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem' }}>
                        {COURSES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={14} color="#94a3b8" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </FieldGroup>
                  <FieldGroup icon={Building2} label="Department / School" span={2}>
                    <div style={{ position: 'relative' }}>
                      <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                        style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem' }}>
                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                      <ChevronDown size={14} color="#94a3b8" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </FieldGroup>
                  <FieldGroup icon={GraduationCap} label="Current Level">
                    <div style={{ position: 'relative' }}>
                      <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                        style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem' }}>
                        {LEVELS.map(l => <option key={l}>{l}</option>)}
                      </select>
                      <ChevronDown size={14} color="#94a3b8" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </FieldGroup>
                  <FieldGroup icon={Calendar} label="Session">
                    <div style={{ position: 'relative' }}>
                      <select value={form.session} onChange={e => setForm({ ...form, session: e.target.value })}
                        style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem' }}>
                        {SESSIONS.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={14} color="#94a3b8" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </FieldGroup>
                  <FieldGroup icon={Shield} label="Admission Status">
                    <div style={{ position: 'relative' }}>
                      <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                        style={{ ...inputStyle, appearance: 'none', paddingRight: '2rem' }}>
                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={14} color="#94a3b8" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </FieldGroup>
                  <FieldGroup icon={Hash} label="JAMB Score">
                    <input type="text" value={form.jambScore} onChange={e => setForm({ ...form, jambScore: e.target.value })}
                      placeholder="e.g. 278" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND_MID}`; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
                    />
                  </FieldGroup>
                </div>
              )}

              {/* ── Contact Tab ── */}
              {activeTab === 'contact' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <FieldGroup icon={FileText} label="Email Address" span={2}>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="student@futminna.edu.ng" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND_MID}`; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
                    />
                  </FieldGroup>
                  <FieldGroup icon={FileText} label="Phone Number" span={2}>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+234 800 000 0000" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND_MID}`; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc'; }}
                    />
                  </FieldGroup>
                </div>
              )}

              {/* Save Button */}
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem',
                    background: `linear-gradient(135deg, rgb(74, 0, 74) 0%, rgb(110, 0, 110) 100%)`,
                    color: '#fff', border: 'none', borderRadius: '12px',
                    padding: '0.85rem 1.5rem', fontWeight: 800, fontSize: '0.9rem',
                    cursor: 'pointer', fontFamily: 'inherit',
                    boxShadow: '0 4px 18px rgba(74, 0, 74, 0.4), 0 0 0 0 rgb(74, 0, 74)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(74, 0, 74, 0.6), 0 0 20px rgba(74, 0, 74, 0.35)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 18px rgba(74, 0, 74, 0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Save size={16} />
                  Save / Confirm Record
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1.5px solid #e2e8f0',
                    background: '#f8fafc', color: '#64748b', fontWeight: 700, fontSize: '0.875rem',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isEditing && (
            <div style={{
              textAlign: 'center', padding: '2.5rem 1rem',
              background: '#f8fafc', borderRadius: '14px', border: '1.5px dashed #cbd5e1',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '16px',
                background: BRAND_LIGHT, display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 1rem',
              }}>
                <Search size={26} color={BRAND} />
              </div>
              <p style={{ fontWeight: 700, color: '#1e0538', margin: '0 0 0.35rem', fontSize: '0.95rem' }}>
                Search for a Student Record
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
                Enter a Matriculation Number above and click <strong>Find Record</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Spin keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
