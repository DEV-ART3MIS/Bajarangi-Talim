import React, { useState, useEffect } from 'react';
import { X, Flame, Shield, User, Mail, Lock, Phone, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
  const { authModal, closeAuthModal, login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(authModal.mode === 'register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipPlan, setMembershipPlan] = useState('Warrior Pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [fitnessGoal, setFitnessGoal] = useState('Strength & Conditioning');

  useEffect(() => {
    setIsRegister(authModal.mode === 'register');
    if (authModal.preselectedPlan) {
      setMembershipPlan(authModal.preselectedPlan);
    }
    setError('');
    setSuccessMsg('');
  }, [authModal]);

  if (!authModal.isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (isRegister) {
      if (!name || !email || !password) {
        setError('Please fill in your name, email, and password.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }

      const res = await register({
        name,
        email,
        password,
        phone,
        membershipPlan,
        billingCycle,
        fitnessGoal,
      });

      if (!res.success) {
        setError(res.message);
      } else {
        setSuccessMsg(res.message);
      }
    } else {
      if (!email || !password) {
        setError('Please enter both email and password.');
        setLoading(false);
        return;
      }

      const res = await login(email, password);
      if (!res.success) {
        setError(res.message);
      }
    }
    setLoading(false);
  };

  const fillDemo = (type) => {
    setError('');
    setIsRegister(false);
    if (type === 'admin') {
      setEmail('baliram@bajarangitalim.com');
      setPassword('bajarangi123');
    } else if (type === 'trainer') {
      setEmail('nikhil@bajarangitalim.com');
      setPassword('bajarangi123');
    } else {
      setEmail('aarav@example.com');
      setPassword('bajarangi123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#11151f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner */}
        <div className="p-6 pb-4 border-b border-gray-800 bg-[#0d1017]">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-md flex-shrink-0 bg-black">
              <img
                src="/logo.png"
                alt="Hanuman Gym Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                {isRegister ? <span>Join <span className="font-ams text-amber-400">बजरंगी तालीम</span></span> : 'Member Access Portal'}
              </h3>
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-0.5">
                Hanuman Gym Akhada
              </p>
              <p className="text-xs text-gray-400">
                {isRegister
                  ? 'Sign up to register your gym membership and access workouts'
                  : 'Enter your credentials to manage membership and check your pass'}
              </p>
            </div>
          </div>

          {/* Toggle between Register and Login */}
          <div className="grid grid-cols-2 p-1 bg-gray-900 rounded-xl border border-gray-800">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                !isRegister
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                isRegister
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              New Member Sign Up
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Fast Quick Fill Buttons for Testing All 3 Roles */}
          <div className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800 text-[11px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-gray-400 font-semibold">Demo Role Accounts:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => fillDemo('member')}
                className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-orange-400 font-bold border border-gray-700"
              >
                Customer (User)
              </button>
              <button
                type="button"
                onClick={() => fillDemo('trainer')}
                className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-amber-400 font-bold border border-gray-700"
              >
                Trainer (Coach)
              </button>
              <button
                type="button"
                onClick={() => fillDemo('admin')}
                className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-emerald-400 font-bold border border-gray-700"
              >
                Admin (Owner)
              </button>
            </div>
          </div>

          {/* Register-only field: Name */}
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Samar Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-900/80 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                placeholder="warrior@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-900/80 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Password {isRegister && '(Min. 6 chars)'} *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-900/80 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          {/* Register-only fields */}
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-900/80 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition"
                  />
                </div>
              </div>

              {/* Membership Plan Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Select Membership Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Akhada Starter', 'Warrior Pro', 'Bajarangi Elite'].map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => setMembershipPlan(plan)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        membershipPlan === plan
                          ? 'bg-orange-500/20 border-orange-500 text-orange-400 font-bold'
                          : 'bg-gray-900/60 border-gray-800 text-gray-400 text-xs hover:border-gray-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{plan}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Billing Cycle */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Billing Cycle
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                      billingCycle === 'monthly'
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                        : 'bg-gray-900/60 border-gray-800 text-gray-400'
                    }`}
                  >
                    Monthly Renewal
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                      billingCycle === 'annual'
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                        : 'bg-gray-900/60 border-gray-800 text-gray-400'
                    }`}
                  >
                    Annual (20% Off)
                  </button>
                </div>
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Primary Fitness Objective
                </label>
                <select
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="w-full py-2.5 px-3 bg-gray-900/80 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Strength & Conditioning">Strength & Conditioning</option>
                  <option value="Traditional Kushti & Akhada Gada">Traditional Kushti & Akhada Gada</option>
                  <option value="Muscle Hypertrophy / Bodybuilding">Muscle Hypertrophy / Bodybuilding</option>
                  <option value="Weight Loss & Fat Burn">Weight Loss & Fat Burn</option>
                  <option value="Calisthenics & Bodyweight Acrobatics">Calisthenics & Bodyweight Acrobatics</option>
                </select>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : isRegister ? 'Complete Sign Up' : 'Sign In To Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

