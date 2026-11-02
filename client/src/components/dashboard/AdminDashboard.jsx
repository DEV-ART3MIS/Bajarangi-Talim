import React, { useState } from 'react';
import {
  Shield,
  Users,
  CreditCard,
  Database,
  TrendingUp,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  Award,
  Zap,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { api } from '../../services/api';

const AdminDashboard = ({
  user,
  stats,
  members = [],
  contacts = [],
  onUpdateMemberStatus,
  onShowMessage,
  onReloadData,
}) => {
  const [adminTab, setAdminTab] = useState('members'); // 'members' | 'subscriptions' | 'trainers' | 'contacts'
  const [memberSearch, setMemberSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');

  // Subscriptions breakdown
  const subMetrics = stats?.subscriptions || {
    starter: members.filter((m) => m.membershipPlan === 'Akhada Starter').length,
    warrior: members.filter((m) => m.membershipPlan === 'Warrior Pro').length,
    elite: members.filter((m) => m.membershipPlan === 'Bajarangi Elite').length,
    monthly: members.filter((m) => m.billingCycle === 'monthly').length,
    annual: members.filter((m) => m.billingCycle === 'annual').length,
  };

  // Filtered members list
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      (m.phone && m.phone.includes(memberSearch));
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    const matchesPlan = planFilter === 'All' || m.membershipPlan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Trainers list (users with role === 'trainer' or 'admin')
  const trainersList = members.filter((m) => m.role === 'trainer' || m.role === 'admin');

  // Staff on duty roster - Strictly our 3 coaches
  const gymCoaches = [
    {
      name: 'Baliram Kotkar',
      role: 'Head Pehlwan & Chief Ustad (Gym Owner)',
      traineesCount: 16,
      status: 'On Duty',
      phone: '+91 98765 43210',
      specialty: 'Traditional Akhada Kushti & Sacred Gada',
      image: '/trainers/baliram-kotkar.jpg',
    },
    {
      name: 'Nikhil Kotkar',
      role: 'Head Strength & Conditioning Coach',
      traineesCount: 22,
      status: 'On Duty',
      phone: '+91 97654 32109',
      specialty: 'Maximal Powerlifting, Barbell Kinematics & Hypertrophy',
      image: '/trainers/nikhil-kotkar.jpg',
    },
    {
      name: 'Shyam Kotkar',
      role: 'Traditional Gada Master & Calisthenics Specialist',
      traineesCount: 18,
      status: 'Shift Starts 4 PM',
      phone: '+91 98112 23344',
      specialty: 'Heavy Gada Swings, Bodyweight Calisthenics & Mobility',
      image: '/trainers/shyam-kotkar.jpg',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. HIGH LEVEL GYM & REVENUE STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Enrolled</span>
          <div className="text-3xl font-black text-white mt-1">
            {stats?.totalMembers || members.length} <span className="text-xs text-gray-500 font-normal">Warriors</span>
          </div>
          <div className="text-[10px] text-orange-400 mt-1 font-semibold">Active Gym Census</div>
        </div>

        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Turnstile Active</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            {stats?.activeMembers || 0} <span className="text-xs text-gray-400 font-normal">Passes</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            {stats?.pendingMembers || 0} Pending • {stats?.expiredMembers || 0} Expired
          </div>
        </div>

        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Monthly Revenue Est.</span>
          <div className="text-3xl font-black text-amber-400 mt-1">
            {stats?.monthlyRevenue || '₹84,500'}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">● 94% Collection Rate</div>
        </div>

        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Facility & Arena</span>
          <div className="text-3xl font-black text-white mt-1">
            12,000 <span className="text-xs text-gray-500 font-normal">Sq. Ft</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center space-x-1">
            <span>Akhada & Sauna Operational</span>
          </div>
        </div>
      </div>

      {/* 2. ADMIN TABS NAVIGATION */}
      <div className="bg-[#121622] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-800 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Gym Owner & Executive Console</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Bajarangi Talim Operations Command
            </h2>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap bg-gray-900 p-1 rounded-2xl border border-gray-800 gap-1">
            <button
              onClick={() => setAdminTab('members')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                adminTab === 'members'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Members ({members.length})</span>
            </button>

            <button
              onClick={() => setAdminTab('subscriptions')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                adminTab === 'subscriptions'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Subscriptions</span>
            </button>

            <button
              onClick={() => setAdminTab('trainers')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                adminTab === 'trainers'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Coaches & Staff</span>
            </button>

            <button
              onClick={() => setAdminTab('contacts')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                adminTab === 'contacts'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquiries ({contacts.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: MEMBERS DIRECTORY */}
        {adminTab === 'members' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search members by name, email, phone..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-2 px-3 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-orange-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                </select>

                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="py-2 px-3 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-orange-500"
                >
                  <option value="All">All Plans</option>
                  <option value="Akhada Starter">Akhada Starter</option>
                  <option value="Warrior Pro">Warrior Pro</option>
                  <option value="Bajarangi Elite">Bajarangi Elite</option>
                </select>
              </div>
            </div>

            {/* Members Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-900 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Warrior</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Subscription Plan</th>
                    <th className="py-3 px-4">Turnstile Status</th>
                    <th className="py-3 px-4">Assigned Coach</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {filteredMembers.map((member) => (
                    <tr key={member._id || member.id} className="hover:bg-gray-800/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm">{member.name}</div>
                        <div className="text-[11px] text-gray-400">{member.email} • {member.phone || 'No phone'}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          member.role === 'admin'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : member.role === 'trainer'
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            : 'bg-gray-800 text-gray-300'
                        }`}>
                          {member.role || 'member'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-orange-400 block">{member.membershipPlan}</span>
                        <span className="text-[10px] text-gray-500 uppercase">{member.billingCycle || 'monthly'}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          member.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : member.status === 'Pending'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-red-500/20 text-red-400 border-red-500/40'
                        }`}>
                          ● {member.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {member.assignedTrainer || 'Coach Nikhil Kotkar'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex space-x-1">
                          {['Active', 'Pending', 'Expired'].map((st) => (
                            <button
                              key={st}
                              onClick={() => onUpdateMemberStatus(member._id || member.id, st)}
                              disabled={member.status === st}
                              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition ${
                                member.status === st
                                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                  : 'bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SUBSCRIPTIONS TAKEN ANALYTICS */}
        {adminTab === 'subscriptions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-gray-900 p-6 rounded-2xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Bajarangi Elite Tier</span>
                <div className="text-3xl font-black text-white">{subMetrics.elite} Enrolled</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  VIP Pehlwan package with personal Gada coaching, cedarwood sauna, and biometric tracking.
                </p>
                <div className="pt-2 text-xs font-bold text-amber-400">₹3,999 / month • ₹38,390 / year</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/15 via-orange-500/5 to-gray-900 p-6 rounded-2xl border border-orange-500/30 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Warrior Pro Tier</span>
                <div className="text-3xl font-black text-white">{subMetrics.warrior} Enrolled</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Most popular tier. Olympic power platforms, free weights arena, and akhada mud pit access.
                </p>
                <div className="pt-2 text-xs font-bold text-orange-400">₹2,499 / month • ₹23,990 / year</div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900 p-6 rounded-2xl border border-gray-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Akhada Starter Tier</span>
                <div className="text-3xl font-black text-white">{subMetrics.starter} Enrolled</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Traditional ground-roots akhada pit access, basic calisthenics rigs, and community workouts.
                </p>
                <div className="pt-2 text-xs font-bold text-gray-300">₹1,499 / month • ₹14,390 / year</div>
              </div>
            </div>

            <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-white text-sm">Billing Cycle Breakdown Across Gym</span>
                <p className="text-gray-400 text-xs">Annual memberships guarantee recurring gym liquidity & member retention.</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center px-4 py-2 bg-gray-900 rounded-xl border border-gray-800">
                  <span className="text-[10px] uppercase text-gray-400 block font-bold">Monthly</span>
                  <span className="text-base font-black text-white">{subMetrics.monthly} Members</span>
                </div>
                <div className="text-center px-4 py-2 bg-gray-900 rounded-xl border border-gray-800">
                  <span className="text-[10px] uppercase text-emerald-400 block font-bold">Annual (20% Off)</span>
                  <span className="text-base font-black text-emerald-400">{subMetrics.annual} Members</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COACHES & STAFF */}
        {adminTab === 'trainers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gymCoaches.map((coach) => (
              <div key={coach.name} className="bg-gray-900/70 p-5 rounded-2xl border border-gray-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{coach.name}</h4>
                    <span className="text-xs text-orange-400 font-semibold">{coach.role}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {coach.status}
                  </span>
                </div>
                <p className="text-xs text-gray-300">{coach.specialty}</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-xs">
                  <span className="text-gray-400">Assigned Trainees: <strong className="text-white">{coach.traineesCount} warriors</strong></span>
                  <span className="text-gray-400">{coach.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: INQUIRIES & LEADS */}
        {adminTab === 'contacts' && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                No customer inquiries received yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.map((cnt) => (
                  <div key={cnt._id} className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{cnt.name}</h4>
                        <span className="text-xs text-orange-400">{cnt.email} • {cnt.phone || 'No phone'}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 font-semibold">
                        {cnt.subject}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-gray-800/80">
                      "{cnt.message}"
                    </p>
                    <div className="text-[10px] text-gray-500 flex justify-between items-center">
                      <span>Received: {new Date(cnt.createdAt).toLocaleString()}</span>
                      {cnt.phone && (
                        <a
                          href={`tel:${cnt.phone}`}
                          className="text-emerald-400 hover:underline font-bold flex items-center space-x-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call Lead</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

