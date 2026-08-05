import React, { useState } from 'react';
import {
  Download, RefreshCcw, UserCog, MonitorPlay,
  Key, Lock, ClipboardList, Database, Settings2,
  CheckCircle2, Loader2, Shield, Zap
} from 'lucide-react';

const BRAND = 'rgb(74, 0, 74)';

const tools = [
  {
    id: 'download-images',
    label: 'Download Images',
    description: 'Export all student passport photographs as a ZIP archive.',
    icon: Download,
    color: '#059669', bg: '#ecfdf5', border: '#bbf7d0',
  },
  {
    id: 'reset-password',
    label: 'Reset Student Password',
    description: "Reset a student's portal password to their matric number.",
    icon: Key,
    color: '#dc2626', bg: '#fef2f2', border: '#fecaca',
  },
  {
    id: 'reset-reg-steps',
    label: 'Reset Reg. Steps',
    description: "Clear a student's registration steps to allow re-submission.",
    icon: RefreshCcw,
    color: '#d97706', bg: '#fffbeb', border: '#fde68a',
  },
  {
    id: 'login-as-student',
    label: 'Login As Student',
    description: 'Impersonate a student account for support and debugging.',
    icon: UserCog,
    color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
  },
  {
    id: 'manage-admission',
    label: 'Manage Admission Data',
    description: 'View and update all admission records for the current session.',
    icon: MonitorPlay,
    color: BRAND, bg: 'rgba(74,0,74,0.06)', border: 'rgba(74,0,74,0.15)',
  },
  {
    id: 'audit-logs',
    label: 'Audit Logs',
    description: 'View a full log of admin actions and system events.',
    icon: ClipboardList,
    color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe',
  },
  {
    id: 'backup-db',
    label: 'Backup Database',
    description: 'Create a backup snapshot of the portal database.',
    icon: Database,
    color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc',
  },
  {
    id: 'system-settings',
    label: 'System Settings',
    description: 'Configure portal-wide settings, sessions, and permissions.',
    icon: Settings2,
    color: '#475569', bg: '#f8fafc', border: '#e2e8f0',
  },
];

export default function AdminControlPanel() {
  const [activeId, setActiveId] = useState(null);
  const [completedId, setCompletedId] = useState(null);

  const handleTool = (id) => {
    setActiveId(id);
    setCompletedId(null);
    setTimeout(() => {
      setActiveId(null);
      setCompletedId(id);
      setTimeout(() => setCompletedId(null), 2500);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${BRAND} 0%, rgb(110, 0, 110) 100%)`,
        borderRadius: '18px', padding: '1.75rem 2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
          <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <Shield size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0, fontFamily: 'var(--font-display)' }}>
              Control Panel
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '0.1rem 0 0' }}>
              Administrative tools & system management — {tools.length} tools available
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isLoading   = activeId === tool.id;
          const isCompleted = completedId === tool.id;

          return (
            <div
              key={tool.id}
              style={{
                background: '#ffffff',
                border: `1.5px solid ${isCompleted ? '#86efac' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: '16px', padding: '1.35rem',
                display: 'flex', flexDirection: 'column',
                boxShadow: isCompleted ? '0 4px 18px rgba(34,197,94,0.12)' : '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { if (!isLoading && !isCompleted) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = isCompleted ? '0 4px 18px rgba(34,197,94,0.12)' : '0 2px 10px rgba(0,0,0,0.04)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '1rem', flex: 1 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '12px',
                  background: tool.bg, border: `1px solid ${tool.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={22} color={tool.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.25rem' }}>{tool.label}</h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{tool.description}</p>
                </div>
              </div>

              <button
                onClick={() => handleTool(tool.id)}
                disabled={isLoading}
                style={{
                  background: isCompleted
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    : isLoading
                    ? '#f1f5f9'
                    : `linear-gradient(135deg, ${tool.color} 0%, ${tool.color}dd 100%)`,
                  border: 'none',
                  color: isLoading ? '#94a3b8' : '#fff',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                  width: '100%',
                  fontFamily: 'inherit',
                  transition: 'all 0.25s ease',
                  boxShadow: isLoading || isCompleted ? 'none' : `0 4px 14px ${tool.color}30`,
                }}
                onMouseEnter={e => { if (!isLoading && !isCompleted) e.currentTarget.style.boxShadow = `0 6px 20px ${tool.color}45`; }}
                onMouseLeave={e => { if (!isLoading && !isCompleted) e.currentTarget.style.boxShadow = `0 4px 14px ${tool.color}30`; }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    Processing…
                  </>
                ) : isCompleted ? (
                  <>
                    <CheckCircle2 size={15} />
                    Done!
                  </>
                ) : (
                  <>
                    <Zap size={14} />
                    {tool.label}
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
