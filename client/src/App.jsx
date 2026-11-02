import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import MembershipCardModal from './components/MembershipCardModal';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TrainersPage from './pages/TrainersPage';
import MembershipPage from './pages/MembershipPage';
import ExercisesPage from './pages/ExercisesPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import BMICalculator from './components/BMICalculator';

const MainApp = () => {
  const [activePage, setActivePage] = useState('home');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [initialExerciseId, setInitialExerciseId] = useState(null);

  const handleOpenExercise = (exerciseId) => {
    setInitialExerciseId(exerciseId);
    setActivePage('exercises');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] text-gray-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Header Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openMembershipCard={() => setIsCardModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onOpenExercise={handleOpenExercise}
          />
        )}
        {activePage === 'about' && <AboutPage setActivePage={setActivePage} />}
        {activePage === 'trainers' && <TrainersPage setActivePage={setActivePage} />}
        {activePage === 'pricing' && <MembershipPage setActivePage={setActivePage} />}
        {activePage === 'exercises' && (
          <ExercisesPage initialExerciseId={initialExerciseId} />
        )}
        {activePage === 'bmi' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <BMICalculator
              onSelectPlan={(plan) => {
                setActivePage('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'dashboard' && (
          <DashboardPage
            setActivePage={setActivePage}
            onOpenMembershipCard={() => setIsCardModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Modals */}
      <AuthModal />
      <MembershipCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
