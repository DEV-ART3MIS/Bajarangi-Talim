import React, { useState, useEffect } from 'react';
import {
  User,
  Shield,
  CreditCard,
  Flame,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Database,
  Users,
  MessageSquare,
  Search,
  Filter,
  ArrowRight,
  RefreshCw,
  LogOut,
  Award,
  Zap,
  Dumbbell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

// Dedicated Dashboard Components
import CustomerDashboard from '../components/dashboard/CustomerDashboard';
import TrainerDashboard from '../components/dashboard/TrainerDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const DashboardPage = ({ setActivePage, onOpenMembershipCard }) => {
  const { user, logout, openAuthModal, updateUserState, login } = useAuth();
  const [stats, setStats] = useState(null);
  const [members, setMembers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  // Active viewing role: 'member' (Customer) | 'trainer' (Coach) | 'admin' (Gym Owner)
  const [viewRole, setViewRole] = useState(user?.role || 'member');

  useEffect(() => {
    if (user?.role) {
      setViewRole(user.role);
    }
  }, [user?.role]);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.getStats();
      if (statsRes.success) setStats(statsRes.stats);

      // Fetch full members & contacts list if logged in
      if (user) {
        const [memRes, cntRes] = await Promise.all([
          api.getMembers(),
          api.getContacts(),
        ]);
        if (memRes.success) setMembers(memRes.members);
        if (cntRes.success) setContacts(cntRes.contacts);
      }
    } catch (err) {
      console.error('Dashboard data load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (memberId, newStatus) => {
    try {
      const res = await api.updateMemberStatus(memberId, newStatus);
      if (res.success) {
        setMembers((prev) =>
          prev.map((m) => (m._id === memberId || m.id === memberId ? { ...m, status: newStatus } : m))
        );
        showActionMessage(`Member status set to ${newStatus}`);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const showActionMessage = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3500);
  };

  // Quick Switch to dedicated demo account
  const handleQuickSwitchAccount = async (roleType) => {
    let email = 'aarav@example.com';
    if (roleType === 'trainer') email = 'nikhil@bajarangitalim.com';
    if (roleType === 'admin') email = 'baliram@bajarangitalim.com';

    try {
      const res = await login(email, 'bajarangi123');
      if (res.success) {
        setViewRole(roleType);
        showActionMessage(`Switched to demo account: ${email}`);
      }
    } catch (err) {
      console.error('Failed to switch demo account:', err);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/30">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-white uppercase font-ams">बजरंगी तालीम Portal Access</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Please log in to manage your Bajarangi Talim gym membership, view your workout stats, check trainee information, or access the owner administration hub.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30"
          >
            Sign In with Email
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase tracking-wider border border-gray-700"
          >
            Register Membership
          </button>
        </div>
      </div>
    );
  }

  const roleLabels = {
    member: { label: 'Customer (User)', icon: Dumbbell, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    trainer: { label: 'Trainer (Coach)', icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    admin: { label: 'Admin (Gym Owner)', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10' },
  };

  const currentRoleInfo = roleLabels[user.role] || roleLabels.member;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. TOP USER BANNER */}
      <div className="bg-[#121622] rounded-3xl border border-gray-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-red-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{user.name}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                user.role === 'admin'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : user.role === 'trainer'
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}>
                {user.role === 'admin' ? 'Gym Owner & Chief Coach' : user.role === 'trainer' ? 'Certified Coach' : user.membershipPlan}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 flex items-center space-x-2">
              <span>{user.email}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Status: {user.status}</span>
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenMembershipCard}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition transform hover:-translate-y-0.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Digital Member Pass</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold text-xs uppercase tracking-wider border border-gray-700 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. DEDICATED DASHBOARD ROLE SELECTOR BAR */}
      <div className="bg-[#121622] p-4 sm:p-5 rounded-3xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Dedicated Dashboard:
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 font-semibold">
            Select View
          </span>
        </div>

        {/* 3 Dedicated Role Buttons */}
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
          <button
            onClick={() => setViewRole('member')}
            className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
              viewRole === 'member'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/30 border border-amber-400/40'
                : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Customer (User)</span>
          </button>

          <button
            onClick={() => setViewRole('trainer')}
            className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
              viewRole === 'trainer'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/30 border border-amber-400/40'
                : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Trainer (Coach)</span>
          </button>

          <button
            onClick={() => setViewRole('admin')}
            className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
              viewRole === 'admin'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/30 border border-amber-400/40'
                : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin (Gym Owner)</span>
          </button>
        </div>

        {/* Demo Account Fast-Switchers */}
        <div className="hidden lg:flex items-center space-x-1.5 text-[11px] text-gray-500">
          <span>Fast Login:</span>
          <button
            onClick={() => handleQuickSwitchAccount('member')}
            className="hover:text-orange-400 font-bold underline"
          >
            Aarav (Member)
          </button>
          <span>•</span>
          <button
            onClick={() => handleQuickSwitchAccount('trainer')}
            className="hover:text-amber-400 font-bold underline"
          >
            Nikhil (Trainer)
          </button>
          <span>•</span>
          <button
            onClick={() => handleQuickSwitchAccount('admin')}
            className="hover:text-orange-400 font-bold underline"
          >
            Baliram (Owner)
          </button>
        </div>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionMsg}</span>
        </div>
      )}

      {/* 3. RENDER THE ACTIVE DEDICATED DASHBOARD */}
      {viewRole === 'member' && (
        <CustomerDashboard
          user={user}
          stats={stats}
          onOpenMembershipCard={onOpenMembershipCard}
          updateUserState={updateUserState}
          onShowMessage={showActionMessage}
        />
      )}

      {viewRole === 'trainer' && (
        <TrainerDashboard
          user={user}
          allMembers={members}
          onShowMessage={showActionMessage}
          onReloadData={fetchDashboardData}
        />
      )}

      {viewRole === 'admin' && (
        <AdminDashboard
          user={user}
          stats={stats}
          members={members}
          contacts={contacts}
          onUpdateMemberStatus={handleUpdateStatus}
          onShowMessage={showActionMessage}
          onReloadData={fetchDashboardData}
        />
      )}
    </div>
  );
};

export default DashboardPage;
