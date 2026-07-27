import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import StudentLogin from './components/StudentLogin';
import Applications from './components/Applications';
import Admissions from './components/Admissions';
import NewsTicker from './components/NewsTicker';
import { AdmissionCheckModal, InstructionsModal, ForgotPasswordModal } from './components/Modals';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'checkStatus', 'instructions', 'forgotPassword', 'admin-login', 'central-payments', 'post-utme'
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [selectedInstructionsKey, setSelectedInstructionsKey] = useState('pre-degree');

  const handleOpenStatusModal = (card) => {
    setSelectedCardData(card);
    setActiveModal('checkStatus');
  };

  const handleOpenInstructions = (key) => {
    setSelectedInstructionsKey(key);
    setActiveModal('instructions');
  };

  const handleOpenHeaderModal = (id) => {
    if (id === 'admin-login') {
      alert('🔒 Redirecting to FUT-MINNA Staff & Admin Authentication Gateway...');
    } else if (id === 'central-payments') {
      alert('💳 Opening FUT-MINNA Central Payments & Remita Gateway...');
    } else if (id === 'post-utme') {
      handleOpenInstructions('undergraduate');
    }
  };

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

        {/* Mobile Navigation Drawer with Explicit Cancel / Close Button */}
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenModal={handleOpenHeaderModal}
        />

        {/* Interactive Modals */}
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

      </div>
    </div>
  );
}
