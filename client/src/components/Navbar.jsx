import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconHome,
  IconShieldCheck,
  IconUsers,
  IconReceipt2,
  IconBarbell,
  IconCalculator,
  IconMail,
  IconUser,
  IconCreditCard,
  IconActivity,
  IconLogout,
} from '@tabler/icons-react';

const Navbar = ({ activePage, setActivePage, openMembershipCard }) => {
  const { user, logout, openAuthModal } = useAuth();

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dockLinks = [
    {
      title: 'Home',
      icon: (
        <img
          src="/logo-transparent-sm.png"
          className="h-full w-full object-contain bg-transparent transition-transform hover:scale-110"
          alt="Home - Hanuman Gym"
        />
      ),
      href: '#home',
      active: activePage === 'home',
      onClick: () => handleNavClick('home'),
    },
    {
      title: 'About Us',
      icon: <IconShieldCheck className="h-full w-full" />,
      href: '#about',
      active: activePage === 'about',
      onClick: () => handleNavClick('about'),
    },
    {
      title: 'Trainers & Coaches',
      icon: <IconUsers className="h-full w-full" />,
      href: '#trainers',
      active: activePage === 'trainers',
      onClick: () => handleNavClick('trainers'),
    },
    {
      title: 'Plans & Pricing',
      icon: <IconReceipt2 className="h-full w-full" />,
      href: '#pricing',
      active: activePage === 'pricing',
      onClick: () => handleNavClick('pricing'),
    },
    {
      title: 'Exercise Library',
      icon: <IconBarbell className="h-full w-full" />,
      href: '#exercises',
      active: activePage === 'exercises',
      onClick: () => handleNavClick('exercises'),
    },
    {
      title: 'BMI Calculator',
      icon: <IconCalculator className="h-full w-full" />,
      href: '#bmi',
      active: activePage === 'bmi',
      onClick: () => handleNavClick('bmi'),
    },
    {
      title: 'Contact',
      icon: <IconMail className="h-full w-full" />,
      href: '#contact',
      active: activePage === 'contact',
      onClick: () => handleNavClick('contact'),
    },
    {
      title: user
        ? user.role === 'admin'
          ? 'Owner Hub'
          : user.role === 'trainer'
          ? 'Trainer Hub'
          : 'Member Portal'
        : 'Portal / Sign In',
      icon: user?.role === 'admin' ? (
        <IconActivity className="h-full w-full" />
      ) : user?.role === 'trainer' ? (
        <IconUsers className="h-full w-full" />
      ) : (
        <IconUser className="h-full w-full" />
      ),
      href: '#dashboard',
      active: activePage === 'dashboard',
      onClick: () => (user ? handleNavClick('dashboard') : openAuthModal('login')),
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0c0f17]/90 backdrop-blur-md border-b border-gray-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Smaller & Transparent */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/logo-transparent-sm.png"
                alt="Hanuman Gym Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain bg-transparent transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-ams leading-none">
                <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                  बजरंगी
                </span>
                <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-amber-500 drop-shadow-md">
                  तालीम
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[9px] tracking-widest uppercase text-gray-400 font-semibold mt-0.5">
                <span className="text-amber-400 font-bold">HANUMAN GYM</span>
                <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                <span>ESTD 1982</span>
              </div>
            </div>
          </div>

          {/* Floating Dock Navbar Component */}
          <div className="flex items-center justify-center">
            <FloatingDock items={dockLinks} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2.5 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={openMembershipCard}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-800/90 hover:bg-gray-700/90 border border-gray-700 text-xs font-medium text-gray-200 transition shadow-sm"
                  title="View Digital Member Card"
                >
                  <IconCreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">My Pass</span>
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition"
                  title="Sign Out"
                >
                  <IconLogout className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="hidden sm:inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-800/70 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Join Talim
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
