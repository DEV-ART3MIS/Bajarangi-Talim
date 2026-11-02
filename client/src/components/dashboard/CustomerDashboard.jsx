import React, { useState } from 'react';
import {
  Flame,
  Dumbbell,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  Activity,
  Award,
  Zap,
  ArrowUpRight,
  Shield,
  FileText,
  Printer,
  X,
  PlusCircle,
  MessageSquare,
  User,
  HeartPulse
} from 'lucide-react';
import { api } from '../../services/api';

const CustomerDashboard = ({
  user,
  stats,
  onOpenMembershipCard,
  updateUserState,
  onShowMessage,
}) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  // Quick workout log state
  const [logExercise, setLogExercise] = useState('Bajarangi Gada Swings');
  const [logReps, setLogReps] = useState(30);
  const [logWeight, setLogWeight] = useState(16);
  const [logCalories, setLogCalories] = useState(180);

  // User workout stats fallback
  const currentWorkoutStats = user?.workoutStats || {
    weeklyWorkouts: 4,
    totalCalories: 3450,
    hoursTrained: 6.5,
    streakDays: 5,
    volumeKg: 18400,
    gadaSwings: 120,
  };

  const planPricing = {
    'Akhada Starter': { monthly: 1499, annual: 14390, name: 'Akhada Starter' },
    'Warrior Pro': { monthly: 2499, annual: 23990, name: 'Warrior Pro' },
    'Bajarangi Elite': { monthly: 3999, annual: 38390, name: 'Bajarangi Elite' },
  };

  const currentPlanInfo = planPricing[user?.membershipPlan] || planPricing['Warrior Pro'];
  const isAnnual = user?.billingCycle === 'annual';
  const planPrice = isAnnual ? currentPlanInfo.annual : currentPlanInfo.monthly;

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    if (!user?.expiryDate) return 24;
    const expiry = new Date(user.expiryDate);
    const now = new Date();
    const diff = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysRemaining = calculateDaysRemaining();

  const handleUpgrade = async (e) => {
    e.preventDefault();
    if (!selectedPlan || selectedPlan === user?.membershipPlan) return;
    setIsUpgrading(true);
    try {
      const res = await api.updateMemberPlan(user.id || user._id, {
        membershipPlan: selectedPlan,
        billingCycle: user.billingCycle || 'monthly',
      });
      if (res.success && res.member) {
        updateUserState(res.member);
        onShowMessage(`🎉 Successfully switched to ${selectedPlan}!`);
      }
    } catch (err) {
      console.error('Plan upgrade error:', err);
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleSaveWorkout = async (e) => {
    e.preventDefault();
    const newStats = {
      ...currentWorkoutStats,
      weeklyWorkouts: (currentWorkoutStats.weeklyWorkouts || 0) + 1,
      totalCalories: (currentWorkoutStats.totalCalories || 0) + Number(logCalories),
      volumeKg: (currentWorkoutStats.volumeKg || 0) + (Number(logReps) * Number(logWeight)),
      gadaSwings: logExercise.includes('Gada')
        ? (currentWorkoutStats.gadaSwings || 0) + Number(logReps)
        : (currentWorkoutStats.gadaSwings || 0),
    };

    try {
      const res = await api.updateWorkoutStats(user.id || user._id, newStats);
      if (res.success && res.member) {
        updateUserState(res.member);
        onShowMessage(`💪 Logged ${logReps} reps of ${logExercise}!`);
        setShowLogModal(false);
      }
    } catch (err) {
      console.error('Failed to log workout:', err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. TOP GYM & TURNSTILE STATUS BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Turnstile Access Card */}
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Turnstile Status</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ● {user?.status || 'Active'}
            </span>
          </div>
          <div className="text-xl font-black text-white mt-2 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Turnstile Authorized</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Tap below to scan pass at biometric barrier</p>
          <button
            onClick={onOpenMembershipCard}
            className="mt-3 w-full py-2 px-3 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Open Digital Pass</span>
          </button>
        </div>

        {/* Gym Timings & Floor Density */}
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Gym Arena Hours</span>
            <span className="text-[10px] font-bold text-amber-400">Open Now</span>
          </div>
          <div className="text-xl font-black text-white mt-2 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>5:00 AM – 10:30 PM</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-gray-400">Floor Density:</span>
            <span className="font-bold text-emerald-400">Low (32% Capacity)</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[32%]"></div>
          </div>
        </div>

        {/* Akhada Mud Pit Condition */}
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Akhada Mud Pit</span>
            <span className="text-[10px] font-bold text-orange-400">Consecrated</span>
          </div>
          <div className="text-xl font-black text-white mt-2 flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span>Red Soil Ready</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Turmeric, neem & camphor treated earth. Open for wrestling & Gada.</p>
        </div>

        {/* Bio-Sauna & Recovery Lounge */}
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Steam Sauna</span>
            <span className="text-[10px] font-bold text-emerald-400">85°C Active</span>
          </div>
          <div className="text-xl font-black text-white mt-2 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Cedarwood Sauna</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Contrast ice plunges & percussive therapy slots available today.</p>
        </div>
      </div>

      {/* 2. DEDICATED WORKOUT STATS SECTION */}
      <div className="bg-[#121622] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Personal Training Analytics</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Your Workout Stats & Performance Log
            </h2>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Today's Workout</span>
          </button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-900/70 p-4 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Weekly Workouts</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {currentWorkoutStats.weeklyWorkouts} <span className="text-xs text-gray-500">/ 5 sessions</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">● 80% Weekly Target Met</div>
          </div>

          <div className="bg-gray-900/70 p-4 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Calories Burned</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              {currentWorkoutStats.totalCalories?.toLocaleString()} <span className="text-xs text-gray-500">kcal</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-1">Avg 580 kcal/session</div>
          </div>

          <div className="bg-gray-900/70 p-4 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Hours Trained</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {currentWorkoutStats.hoursTrained} <span className="text-xs text-gray-500">hrs</span>
            </div>
            <div className="text-[10px] text-orange-400 mt-1">+1.5 hrs vs last week</div>
          </div>

          <div className="bg-gray-900/70 p-4 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Workout Streak</span>
            <div className="text-2xl sm:text-3xl font-black text-orange-400 mt-1 flex items-center space-x-1">
              <span>{currentWorkoutStats.streakDays}</span>
              <span className="text-xs text-gray-400 font-normal">days 🔥</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">Unbroken Akhada Grit</div>
          </div>

          <div className="bg-gray-900/70 p-4 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Volume Lifted</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {(currentWorkoutStats.volumeKg / 1000).toFixed(1)}k <span className="text-xs text-gray-500">kg</span>
            </div>
            <div className="text-[10px] text-amber-400 mt-1">Iron & Free Weights</div>
          </div>
        </div>

        {/* Signature Akhada Movements Tracking */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Signature Akhada & Strength Lifts Progress
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-gradient-to-br from-orange-950/30 to-gray-900 p-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center justify-between text-gray-400 mb-1">
                <span>Bajarangi Gada Swings</span>
                <span className="text-orange-400 font-bold">16 kg Gada</span>
              </div>
              <div className="text-2xl font-black text-white">{currentWorkoutStats.gadaSwings} <span className="text-xs text-gray-400">reps</span></div>
              <div className="text-[10px] text-gray-400 mt-1">Target: 200 reps uninterrupted</div>
            </div>

            <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
              <div className="flex items-center justify-between text-gray-400 mb-1">
                <span>Surya Dand (Hindu Push-up)</span>
                <span className="text-amber-400 font-bold">PR 150 reps</span>
              </div>
              <div className="text-2xl font-black text-white">150 <span className="text-xs text-gray-400">reps logged</span></div>
              <div className="text-[10px] text-emerald-400 mt-1">Shoulder & triceps strength high</div>
            </div>

            <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
              <div className="flex items-center justify-between text-gray-400 mb-1">
                <span>Barbell Back Squat</span>
                <span className="text-orange-400 font-bold">140 kg PR</span>
              </div>
              <div className="text-2xl font-black text-white">140 <span className="text-xs text-gray-400">kg (5 reps)</span></div>
              <div className="text-[10px] text-gray-400 mt-1">Assigned by Coach Nikhil Kotkar</div>
            </div>

            <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800">
              <div className="flex items-center justify-between text-gray-400 mb-1">
                <span>Akhada Mud Pit Baithaks</span>
                <span className="text-amber-400 font-bold">Pehlwan Squad</span>
              </div>
              <div className="text-2xl font-black text-white">200 <span className="text-xs text-gray-400">reps</span></div>
              <div className="text-[10px] text-emerald-400 mt-1">Excellent knee & quad conditioning</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUBSCRIPTIONS TAKEN (MEMBERSHIP & BILLING) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-[#121622] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Subscription Taken</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">{user?.membershipPlan || 'Warrior Pro'}</h3>
              <p className="text-xs text-orange-400 mt-0.5">Active Tier • {isAnnual ? 'Annual Pass (20% Savings)' : 'Monthly Membership'}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white">₹{planPrice?.toLocaleString('en-IN')}</span>
              <span className="text-xs text-gray-400 block">{isAnnual ? '/billed annually' : '/month'}</span>
            </div>
          </div>

          {/* Subscription Validity Details */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800">
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Joined On</span>
              <span className="font-bold text-gray-200 mt-0.5 block">
                {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Active Member'}
              </span>
            </div>
            <div className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800">
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Valid Until</span>
              <span className="font-bold text-orange-400 mt-0.5 block">
                {user?.expiryDate ? new Date(user.expiryDate).toLocaleDateString() : 'Auto-renews'}
              </span>
            </div>
            <div className="bg-gray-900/80 p-3.5 rounded-xl border border-gray-800">
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Days Left</span>
              <span className="font-black text-emerald-400 mt-0.5 block text-sm">
                {daysRemaining} Days
              </span>
            </div>
          </div>

          {/* Included Amenities Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
              Included In Your {user?.membershipPlan} Tier:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Unlimited Floor & Olympic Iron Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sacred Red-Clay Akhada Pit & Gada</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Assigned Coach Workout Monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Digital Exercise Library & Mobile Pass</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Cedarwood Steam Sauna & Contrast Plunge</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Nutrition & Recovery Guidebook</span>
              </div>
            </div>
          </div>

          {/* Upgrade / Switch Form */}
          <form onSubmit={handleUpgrade} className="pt-2 border-t border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300 uppercase">Change / Upgrade Membership</span>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(true)}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center space-x-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Invoice Receipt</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {['Akhada Starter', 'Warrior Pro', 'Bajarangi Elite'].map((plan) => (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition ${
                    selectedPlan === plan || (!selectedPlan && user?.membershipPlan === plan)
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400 font-bold shadow-md'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div className="font-bold">{plan}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">₹{planPricing[plan].monthly}/mo</div>
                </button>
              ))}
            </div>

            {selectedPlan && selectedPlan !== user?.membershipPlan && (
              <button
                type="submit"
                disabled={isUpgrading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-orange-600/30"
              >
                {isUpgrading ? 'Updating...' : `Confirm Switch to ${selectedPlan}`}
              </button>
            )}
          </form>
        </div>

        {/* 4. ASSIGNED TRAINER & COACH'S NOTE */}
        <div className="lg:col-span-5 bg-[#121622] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
              <User className="w-3.5 h-3.5" />
              <span>Assigned Personal Coach</span>
            </div>

            <div className="flex items-center space-x-4 bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
              <img
                src="/trainers/nikhil-kotkar.jpg"
                alt="Coach Nikhil Kotkar"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500/40"
              />
              <div>
                <h4 className="text-base font-black text-white">{user?.assignedTrainer || 'Coach Nikhil Kotkar'}</h4>
                <p className="text-xs text-orange-400 font-semibold">Head Strength & Conditioning Coach</p>
                <div className="flex items-center space-x-2 text-[10px] text-gray-400 mt-1">
                  <span>10+ Yrs Coaching</span>
                  <span>•</span>
                  <span>CSCS® Certified</span>
                </div>
              </div>
            </div>

            {/* Next Scheduled Coaching Session */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-4 rounded-2xl border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 uppercase tracking-wider">Next 1-on-1 Session</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Confirmed</span>
              </div>
              <div className="text-sm font-bold text-white pt-1">Tomorrow @ 6:30 AM</div>
              <p className="text-xs text-gray-400">Heavy Back Squats, Barbell Deadlifts & Akhada Core</p>
            </div>

            {/* Coach's Personal Note */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1">
                <MessageSquare className="w-3 h-3 text-orange-400" />
                <span>Coach's Guidance & Progress Note</span>
              </span>
              <p className="text-xs text-gray-300 bg-gray-900/70 p-3.5 rounded-xl border border-gray-800 leading-relaxed italic">
                "{user?.coachNotes || 'Focus on explosive hip drive during Gada swings; maintain neutral spine on squats.'}"
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/919765432109"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 hover:border-orange-500/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Message Coach Nikhil</span>
            </a>
          </div>
        </div>
      </div>

      {/* MODAL 1: INVOICE / RECEIPT MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#11151f] border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center space-x-2.5">
                <img src="/logo-transparent-sm.png" alt="Logo" className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="text-lg font-black font-ams text-white">बजरंगी तालीम</h3>
                  <div className="text-[10px] text-gray-400">Official Membership Tax Invoice</div>
                </div>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Invoice No: <strong className="text-white">BT-INV-{Date.now().toString().slice(-6)}</strong></span>
                <span>Date: <strong className="text-white">{new Date().toLocaleDateString()}</strong></span>
              </div>

              <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800 space-y-2">
                <div className="font-bold text-white uppercase">{user?.name}</div>
                <div className="text-gray-400">{user?.email} • {user?.phone || '+91 91234 56789'}</div>
                <div className="text-gray-400">Turnstile ID: <strong className="text-orange-400">{user?.id || user?._id || 'BT-WARRIOR-01'}</strong></div>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 pb-2">
                    <th className="py-2">Description</th>
                    <th className="py-2">Cycle</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  <tr>
                    <td className="py-3 font-bold text-white">{user?.membershipPlan} Access Tier</td>
                    <td className="py-3 text-gray-400 uppercase">{user?.billingCycle || 'Monthly'}</td>
                    <td className="py-3 text-right text-white font-bold">₹{planPrice?.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">GST (18% inclusive)</td>
                    <td className="py-2 text-gray-400">—</td>
                    <td className="py-2 text-right text-gray-400">Included</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-800 font-bold text-sm">
                    <td className="pt-3 text-white">Total Paid</td>
                    <td className="pt-3 text-emerald-400">Paid (UPI / Card)</td>
                    <td className="pt-3 text-right text-orange-400 font-black">₹{planPrice?.toLocaleString('en-IN')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-800">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="py-2.5 px-6 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: QUICK LOG TODAY'S WORKOUT */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#11151f] border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <Dumbbell className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-black text-white uppercase">Log Workout Session</h3>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWorkout} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-bold uppercase mb-1">Exercise</label>
                <select
                  value={logExercise}
                  onChange={(e) => setLogExercise(e.target.value)}
                  className="w-full py-2.5 px-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Bajarangi Gada Swings">Bajarangi Gada (Mace) Swings</option>
                  <option value="Surya Dand (Hindu Push-ups)">Surya Dand (Hindu Push-ups)</option>
                  <option value="Barbell Back Squats">Barbell Back Squats</option>
                  <option value="Olympic Clean & Jerk">Olympic Clean & Jerk</option>
                  <option value="Red-Clay Akhada Baithaks">Red-Clay Akhada Baithaks</option>
                  <option value="Heavy Deadlift">Heavy Conventional Deadlift</option>
                  <option value="Kettlebell Swings">Kettlebell Conditioning Swings</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-bold uppercase mb-1">Reps / Sets</label>
                  <input
                    type="number"
                    min="1"
                    value={logReps}
                    onChange={(e) => setLogReps(e.target.value)}
                    className="w-full py-2 px-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-bold uppercase mb-1">Weight / Load (kg)</label>
                  <input
                    type="number"
                    min="0"
                    value={logWeight}
                    onChange={(e) => setLogWeight(e.target.value)}
                    className="w-full py-2 px-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-bold uppercase mb-1">Estimated Calories (kcal)</label>
                <input
                  type="number"
                  min="10"
                  value={logCalories}
                  onChange={(e) => setLogCalories(e.target.value)}
                  className="w-full py-2 px-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-orange-600/30 transition mt-2"
              >
                Save Workout To Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;

