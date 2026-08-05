import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import StudentLogin from './components/StudentLogin';
import StudentDashboard from './components/StudentDashboard';
import Applications from './components/Applications';
import Admissions from './components/Admissions';
import NewsTicker from './components/NewsTicker';
import { AdmissionCheckModal, InstructionsModal, ForgotPasswordModal } from './components/Modals';
import CentralPaymentModal from './components/CentralPaymentModal';
import Footer from './components/Footer';
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminDashboard  from './components/admin/AdminDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [selectedInstructionsKey, setSelectedInstructionsKey] = useState('pre-degree');

  // Admin auth state — null means public portal view
  const [adminUser, setAdminUser] = useState(null);

  // Student auth state
  const [studentUser, setStudentUser] = useState(null);

  const handleStudentLogin = (username) => {
    setStudentUser(username);
  };

  const handleStudentLogout = () => {
    setStudentUser(null);
  };

  const handleOpenStatusModal = (card) => {
    setSelectedCardData(card);
    setActiveModal('checkStatus');
  };

  const handleOpenInstructions = (key) => {
    setSelectedInstructionsKey(key);
    setActiveModal('instructions');
  };

  const handleOpenHeaderModal = (id, extraKey) => {
    if (id === 'admin-login') {
      setActiveModal('admin-login');
    } else if (id === 'central-payments') {
      setActiveModal('central-payments');
    } else if (id === 'post-utme') {
      handleOpenInstructions('undergraduate');
    } else if (id === 'instructions') {
      handleOpenInstructions(extraKey || 'pre-degree');
    }
  };

  const handleAdminLogin = (user) => {
    setActiveModal(null);
    setAdminUser(user);
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
  };

  // ── Admin is authenticated → show full Admin Dashboard ──
  if (adminUser) {
    return (
      <AdminDashboard adminUser={adminUser} onLogout={handleAdminLogout} />
    );
  }

  // ── Student is logged in → show Student Dashboard ──
  if (studentUser) {
    return (
      <StudentDashboard studentName={studentUser} onLogout={handleStudentLogout} />
    );
  }

  // ── Default: Public student portal ──
  return (
    <div className="app-container">
      <div className="app-overlay" />

      <div className="app-content">
        {/* Top Header */}
        <Header
          onOpenModal={handleOpenHeaderModal}
          onToggleMobileMenu={() => setIsMobileNavOpen(true)}
        />

        {/* Main Body Shell */}
        <div className="main-wrapper">
          {/* Desktop Sidebar Navigation */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Body Content Area */}
          <main className="main-body-container">
            {/* Live Announcements Ticker */}
            <NewsTicker />

            {/* Layout Grid (Student Login Left, Applications & Admissions Right) */}
            <div className="content-grid">
              
              {/* Left Column: Student Login Mirror Glass Card */}
              <div>
                <StudentLogin
                  onForgotPassword={() => setActiveModal('forgotPassword')}
                  onLoginSuccess={handleStudentLogin}
                />
              </div>

              {/* Right Column: Applications & Admissions Sections */}
              <div className="right-column-grid">
                <Applications onOpenInstructions={handleOpenInstructions} />
                <Admissions
                  onCheckStatus={handleOpenStatusModal}
                  onOpenInstructions={handleOpenInstructions}
                />
              </div>

            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Mobile Navigation Drawer */}
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenModal={handleOpenHeaderModal}
        />

        {/* Staff / Admin Login Modal */}
        {activeModal === 'admin-login' && (
          <AdminLoginModal
            onClose={() => setActiveModal(null)}
            onLoginSuccess={handleAdminLogin}
          />
        )}

        {/* Student-facing Modals */}
        {activeModal === 'checkStatus' && (
          <AdmissionCheckModal
            cardData={selectedCardData}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'instructions' && (
          <InstructionsModal
            instructionsKey={selectedInstructionsKey}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'forgotPassword' && (
          <ForgotPasswordModal
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'central-payments' && (
          <CentralPaymentModal
            onClose={() => setActiveModal(null)}
          />
        )}

      </div>
    </div>
  );
}
