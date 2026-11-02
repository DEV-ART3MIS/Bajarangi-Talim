import React, { useState } from 'react';
import {
  Users,
  Dumbbell,
  CheckCircle2,
  Clock,
  Calendar,
  MessageSquare,
  Award,
  Search,
  Filter,
  Phone,
  ArrowUpRight,
  AlertCircle,
  TrendingUp,
  X,
  Edit3,
  Shield,
  Activity,
  Zap,
  Flame
} from 'lucide-react';
import { api } from '../../services/api';

const TrainerDashboard = ({
  user,
  allMembers = [],
  onShowMessage,
  onReloadData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [goalFilter, setGoalFilter] = useState('All');

  // Trainee coaching note modal state
  const [editingTrainee, setEditingTrainee] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Filter trainees (exclude admins and trainers, or match assigned trainer)
  const trainees = allMembers.filter((m) => m.role === 'member' || !m.role);

  const filteredTrainees = trainees.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.phone && t.phone.includes(searchTerm));
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesGoal =
      goalFilter === 'All' ||
      (t.fitnessGoal && t.fitnessGoal.toLowerCase().includes(goalFilter.toLowerCase()));
    return matchesSearch && matchesStatus && matchesGoal;
  });

  // Calculate subscriptions taken by trainees
  const subBreakdown = {
    elite: trainees.filter((t) => t.membershipPlan === 'Bajarangi Elite').length,
    warrior: trainees.filter((t) => t.membershipPlan === 'Warrior Pro').length,
    starter: trainees.filter((t) => t.membershipPlan === 'Akhada Starter').length,
    active: trainees.filter((t) => t.status === 'Active').length,
    pending: trainees.filter((t) => t.status === 'Pending').length,
    expiringSoon: trainees.filter((t) => {
      if (!t.expiryDate) return false;
      const diff = Math.ceil((new Date(t.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
      return diff <= 15 && diff >= 0;
    }).length,
  };

  const handleOpenEditNote = (trainee) => {
    setEditingTrainee(trainee);
    setNewNote(trainee.coachNotes || '');
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (!editingTrainee) return;
    setIsSavingNote(true);
    try {
      const res = await api.updateTraineeNote(editingTrainee._id || editingTrainee.id, newNote);
      if (res.success) {
        onShowMessage(`📝 Coach note updated for ${editingTrainee.name}!`);
        setEditingTrainee(null);
        if (onReloadData) onReloadData();
      }
    } catch (err) {
      console.error('Failed to update coach note:', err);
    } finally {
      setIsSavingNote(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. TRAINER & GYM OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Trainer Profile Card */}
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Coaching Profile</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Trainer Active
            </span>
          </div>
          <div className="text-xl font-black text-white mt-2">
            {user?.name || 'Coach Nikhil Kotkar'}
          </div>
          <p className="text-xs text-orange-400 mt-0.5 font-semibold">
            {user?.specialization || 'Head Strength & Conditioning Coach'}
          </p>
          <div className="text-[10px] text-gray-400 mt-2 flex items-center space-x-2">
            <span>Shift: 6:00 AM – 11:30 AM</span>
            <span>•</span>
            <span className="text-emerald-400">On Duty</span>
          </div>
        </div>

        {/* Assigned Trainees */}
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Active Trainees</span>
            <span className="text-[10px] font-bold text-emerald-400">Roster Full</span>
          </div>
          <div className="text-3xl font-black text-white mt-1">
            {trainees.length || 18} <span className="text-xs text-gray-400 font-normal">warriors</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            {subBreakdown.active} Active • {subBreakdown.pending} Pending
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-orange-500 h-full rounded-full w-[85%]"></div>
          </div>
        </div>

        {/* Sessions Conducted This Month */}
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Coaching Sessions</span>
            <span className="text-[10px] font-bold text-amber-400">This Month</span>
          </div>
          <div className="text-3xl font-black text-amber-400 mt-1">
            48 <span className="text-xs text-gray-400 font-normal">sessions</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            26.5 Coaching Hours Logged
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">● 94% Trainee Attendance Rate</p>
        </div>

        {/* Trainee PRs Set */}
        <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Trainee PRs Hit</span>
            <span className="text-[10px] font-bold text-orange-400">This Week</span>
          </div>
          <div className="text-3xl font-black text-white mt-1 flex items-center space-x-1">
            <span>12</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            Top PR: Aarav Sharma (140kg Squat)
          </div>
          <p className="text-[11px] text-orange-400 mt-1">High Strength Progression</p>
        </div>
      </div>

      {/* 2. SUBSCRIPTIONS TAKEN BY TRAINEES & EXPIRING ALERTS */}
      <div className="bg-[#121622] p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Subscriptions Taken By Your Trainees
            </h3>
            <p className="text-xs text-gray-400">Overview of client membership tiers and renewal health</p>
          </div>
          {subBreakdown.expiringSoon > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{subBreakdown.expiringSoon} Trainees Expiring In &lt; 15 Days</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-1">
          <div className="bg-gray-900/80 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400">Bajarangi Elite Trainees</span>
            <div className="text-2xl font-black text-amber-400 mt-1">{subBreakdown.elite} Trainees</div>
            <div className="text-[10px] text-gray-400 mt-0.5">VIP Akhada + PT Package</div>
          </div>
          <div className="bg-gray-900/80 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400">Warrior Pro Trainees</span>
            <div className="text-2xl font-black text-orange-400 mt-1">{subBreakdown.warrior} Trainees</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Olympic Rig & Free Weights</div>
          </div>
          <div className="bg-gray-900/80 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400">Akhada Starter Trainees</span>
            <div className="text-2xl font-black text-white mt-1">{subBreakdown.starter} Trainees</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Entry & Mud Pit Basic</div>
          </div>
          <div className="bg-gray-900/80 p-3.5 rounded-2xl border border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400">Renewal Retention</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">92.4%</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Top Tier Coaching Satisfaction</div>
          </div>
        </div>
      </div>

      {/* 3. DEDICATED TRAINEE INFORMATION ROSTER & WORKOUT ADVICE */}
      <div className="bg-[#121622] p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-800 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Assigned Warriors</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Trainee Information & Progress Management
            </h2>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search trainee by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-3 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-orange-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Trainees Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrainees.map((trainee) => {
            const stats = trainee.workoutStats || {
              weeklyWorkouts: 4,
              totalCalories: 3450,
              volumeKg: 18400,
              streakDays: 5,
            };

            return (
              <div
                key={trainee._id || trainee.id}
                className="bg-gray-900/70 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-sm">
                        {trainee.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{trainee.name}</h4>
                        <span className="text-[11px] text-gray-400">{trainee.email}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                        trainee.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {trainee.status}
                    </span>
                  </div>

                  {/* Plan & Goal */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-black/30 p-2 rounded-xl border border-gray-800/80">
                      <span className="text-[9px] uppercase font-bold text-gray-500 block">Plan</span>
                      <span className="font-bold text-orange-400">{trainee.membershipPlan}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded-xl border border-gray-800/80">
                      <span className="text-[9px] uppercase font-bold text-gray-500 block">Goal</span>
                      <span className="font-bold text-gray-200 truncate block">
                        {trainee.fitnessGoal || 'Strength & Conditioning'}
                      </span>
                    </div>
                  </div>

                  {/* Trainee's Workout Stats */}
                  <div className="mt-3 p-2.5 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-gray-400">
                      <span>Weekly Workouts:</span>
                      <span className="font-bold text-white">{stats.weeklyWorkouts} sessions</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Volume Lifted:</span>
                      <span className="font-bold text-amber-400">{(stats.volumeKg / 1000).toFixed(1)}k kg</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Attendance Streak:</span>
                      <span className="font-bold text-emerald-400">{stats.streakDays} days 🔥</span>
                    </div>
                  </div>

                  {/* Coach's Current Note */}
                  <div className="mt-3 p-2.5 rounded-xl bg-orange-500/5 border border-orange-500/20">
                    <span className="text-[10px] font-bold uppercase text-orange-400 block mb-0.5">
                      Your Coach Note:
                    </span>
                    <p className="text-[11px] text-gray-300 italic line-clamp-2">
                      "{trainee.coachNotes || 'No training note recorded yet.'}"
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 flex items-center space-x-2 border-t border-gray-800">
                  <button
                    onClick={() => handleOpenEditNote(trainee)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-orange-400" />
                    <span>Edit Note</span>
                  </button>

                  {trainee.phone && (
                    <a
                      href={`tel:${trainee.phone}`}
                      className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-emerald-400"
                      title="Call Trainee"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={`https://wa.me/${trainee.phone ? trainee.phone.replace(/[^0-9]/g, '') : ''}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                    title="WhatsApp Trainee"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: EDIT TRAINEE COACHING NOTE */}
      {editingTrainee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#11151f] border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <h3 className="text-lg font-black text-white uppercase">Coach Note & Training Guidance</h3>
                <p className="text-xs text-orange-400 font-semibold">{editingTrainee.name}</p>
              </div>
              <button
                onClick={() => setEditingTrainee(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-bold uppercase mb-1">
                  Training Prescription / Technique Note
                </label>
                <textarea
                  rows={4}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="e.g. Increase Gada swings to 20kg. Focus on hip hinge during conventional deadlift."
                  className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-orange-500 leading-relaxed"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  disabled={isSavingNote}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold uppercase tracking-wider text-xs shadow-lg transition"
                >
                  {isSavingNote ? 'Saving...' : 'Save Coaching Note'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTrainee(null)}
                  className="py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold uppercase text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;

