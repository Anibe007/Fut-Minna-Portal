import React from 'react';
import { Home, FileText, CreditCard, GraduationCap, UserCheck } from 'lucide-react';
import { sidebarItems } from '../data/portalData';

export default function Sidebar({ activeTab, setActiveTab, onOpenModal }) {
  const getIcon = (iconName, isActive) => {
    const props = { size: 22, color: isActive ? '#ffffff' : '#94a3b8' };
    switch (iconName) {
      case 'Home':          return <Home {...props} />;
      case 'FileText':      return <FileText {...props} />;
      case 'CreditCard':    return <CreditCard {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'UserCheck':     return <UserCheck {...props} />;
      default:              return null;
    }
  };

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    if (item.id === 'payments') {
      onOpenModal('central-payments');
    } else if (item.id === 'admissions') {
      onOpenModal('instructions', 'undergraduate');
    } else if (item.id === 'applications') {
      onOpenModal('instructions', 'pre-degree');
    } else if (item.id === 'support') {
      onOpenModal('admin-login');
    }
  };

  return (
    <aside className="sidebar-desktop">

      {/* FUT-MINNA Seal Logo at top of Sidebar */}
      <div style={{
        paddingBottom: '0.5rem',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <img
          src="/fut_logo.jpg"
          alt="FUT Minna"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            objectFit: 'contain',
            background: '#ffffff',
            padding: '2px',
            border: '2px solid rgba(74, 0, 74, 0.4)',
            boxShadow: '0 3px 10px rgba(74, 0, 74, 0.25)'
          }}
        />
      </div>

      {/* Sidebar Nav Buttons — each shows a tooltip on hover */}
      {sidebarItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            aria-label={item.label}
            className={`sidebar-nav-btn${isActive ? ' active' : ''}`}
          >
            {/* Icon */}
            {getIcon(item.icon, isActive)}

            {/* Tooltip pill — slides in from the left on :hover via CSS */}
            <span className="sidebar-tooltip">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
