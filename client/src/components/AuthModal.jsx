import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Official SVG Icons for OAuth
const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const AuthModal = () => {
  const { authModal, closeAuthModal, login, register, oauthLogin } = useAuth();
  const [isRegister, setIsRegister] = useState(authModal.mode === 'register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneDigits, setPhoneDigits] = useState(''); // Stores raw 10 digits
  const [phoneError, setPhoneError] = useState('');
  const [membershipPlan, setMembershipPlan] = useState('Warrior Pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [fitnessGoal, setFitnessGoal] = useState('Strength & Conditioning');

  // OAuth Modal Dialog State
  const [oauthDialog, setOauthDialog] = useState(null); // { provider: 'google' | 'github' }
  const [oauthCustomEmail, setOauthCustomEmail] = useState('');
  const [oauthCustomName, setOauthCustomName] = useState('');

  useEffect(() => {
    setIsRegister(authModal.mode === 'register');
    if (authModal.preselectedPlan) {
      setMembershipPlan(authModal.preselectedPlan);
    }
    setError('');
    setSuccessMsg('');
    setPhoneError('');
  }, [authModal]);

  if (!authModal.isOpen) return null;

  // Indian Mobile Number Validation and Formatting
  const handlePhoneChange = (e) => {
    const inputVal = e.target.value;
    // Extract only digits
    let digits = inputVal.replace(/\D/g, '');

    // If user pasted or typed with leading +91 or 91
    if (digits.startsWith('91') && digits.length > 10) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0') && digits.length > 10) {
      digits = digits.slice(1);
    }

    // Limit to 10 digits (Standard Indian Mobile Length)
    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }

    setPhoneDigits(digits);

    // Validation checks for Indian region
    if (digits.length === 0) {
      setPhoneError('');
    } else if (!/^[6-9]/.test(digits)) {
      setPhoneError('Indian mobile numbers must start with 6, 7, 8, or 9 (TRAI regulation).');
    } else if (digits.length > 0 && digits.length < 10) {
      setPhoneError(`${10 - digits.length} more digits required (10-digit Indian number).`);
    } else {
      setPhoneError('');
    }
  };

  // Format 10 digits as "XXXXX XXXXX" for display
  const formatPhoneDisplay = (digits) => {
    if (!digits) return '';
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  };

  const isPhoneValid = phoneDigits.length === 10 && /^[6-9]/.test(phoneDigits);

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

      // Strict validation for Indian mobile number if entered
      if (phoneDigits) {
        if (!/^[6-9]/.test(phoneDigits)) {
          setError('Invalid Indian mobile number: Must begin with 6, 7, 8, or 9.');
          setLoading(false);
          return;
        }
        if (phoneDigits.length !== 10) {
          setError('Please provide a complete 10-digit Indian mobile number.');
          setLoading(false);
          return;
        }
      }

      const formattedPhone = phoneDigits ? `+91 ${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}` : '';

      const res = await register({
        name,
        email,
        password,
        phone: formattedPhone,
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

  // Quick Demo Logins for Customer, Trainer, and Admin
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

  // OAuth Trigger
  const handleOAuthClick = (provider) => {
    setError('');
    setOauthDialog({
      provider,
      title: provider === 'google' ? 'Google Account Authentication' : 'GitHub Account Authentication',
    });
    setOauthCustomEmail(
      provider === 'google' ? 'alex.pehlwan@gmail.com' : 'athlete.dev@github.com'
    );
    setOauthCustomName(
      provider === 'google' ? 'Alex Pehlwan' : 'Warrior Dev'
    );
  };

  const handleOAuthSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!oauthDialog) return;
    setLoading(true);
    setError('');

    const targetEmail = oauthCustomEmail.trim().toLowerCase();
    const targetName = oauthCustomName.trim();

    if (!targetEmail || !targetEmail.includes('@')) {
      setError('Please provide a valid email address for OAuth authentication.');
      setLoading(false);
      return;
    }

    const payload = {
      provider: oauthDialog.provider,
      email: targetEmail,
      name: targetName || (oauthDialog.provider === 'google' ? 'Google Athlete' : 'GitHub Athlete'),
      avatar:
        oauthDialog.provider === 'google'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      oauthId: `${oauthDialog.provider}_${Date.now()}`,
      phone: phoneDigits ? `+91 ${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}` : '',
    };

    const res = await oauthLogin(payload);
    setLoading(false);

    if (res.success) {
      setOauthDialog(null);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#10141e] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
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
                {isRegister ? (
                  <span>
                    Join <span className="font-ams text-amber-400">बजरंगी तालीम</span>
                  </span>
                ) : (
                  'Member Access Portal'
                )}
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
                setPhoneError('');
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
                setPhoneError('');
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

          {/* ========================================================================= */}
          {/* OAuth Social Authentication (Google & GitHub) */}
          {/* ========================================================================= */}
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={() => handleOAuthClick('google')}
                className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#181d29] hover:bg-[#202738] border border-gray-700/80 hover:border-gray-600 rounded-xl text-white text-xs font-bold transition shadow-sm group"
              >
                <GoogleIcon />
                <span className="truncate">
                  {isRegister ? 'Sign up with Google' : 'Sign in with Google'}
                </span>
              </button>

              {/* GitHub OAuth Button */}
              <button
                type="button"
                onClick={() => handleOAuthClick('github')}
                className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#181d29] hover:bg-[#202738] border border-gray-700/80 hover:border-gray-600 rounded-xl text-white text-xs font-bold transition shadow-sm group"
              >
                <GitHubIcon />
                <span className="truncate">
                  {isRegister ? 'Sign up with GitHub' : 'Sign in with GitHub'}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="w-full border-t border-gray-800"></div>
              <span className="absolute px-3 bg-[#10141e] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Or continue with credentials
              </span>
            </div>
          </div>

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

          {/* ========================================================================= */}
          {/* Register-only fields with Indian Mobile Validation */}
          {/* ========================================================================= */}
          {isRegister && (
            <>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Mobile Number (Indian Region 🇮🇳)
                  </label>
                  {isPhoneValid && (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Valid Indian (+91)
                    </span>
                  )}
                  {phoneDigits.length > 0 && !isPhoneValid && (
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                      {phoneDigits.length}/10 digits
                    </span>
                  )}
                </div>

                <div className="relative flex rounded-xl border border-gray-800 bg-gray-900/80 focus-within:border-orange-500 transition overflow-hidden">
                  {/* Fixed Country Code for India */}
                  <div className="flex items-center px-3 bg-gray-800/80 border-r border-gray-700/60 text-xs font-bold text-amber-400 select-none space-x-1">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>

                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={formatPhoneDisplay(phoneDigits)}
                    onChange={handlePhoneChange}
                    className="w-full px-3 py-2.5 bg-transparent text-white text-sm focus:outline-none font-mono tracking-wide"
                  />

                  {/* Right Status Indicator */}
                  <div className="flex items-center pr-3">
                    {isPhoneValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : phoneError ? (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Phone className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Validation Feedback message */}
                {phoneError ? (
                  <p className="text-[11px] text-amber-400 font-medium flex items-center gap-1 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{phoneError}</span>
                  </p>
                ) : isPhoneValid ? (
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Verified 10-digit Indian mobile number (+91 {formatPhoneDisplay(phoneDigits)}).</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-500 mt-1.5">
                    Enter a 10-digit Indian mobile number starting with 6, 7, 8, or 9 (e.g. 98765 43210).
                  </p>
                )}
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

        {/* ========================================================================= */}
        {/* Interactive OAuth Account Selection Dialog Modal */}
        {/* ========================================================================= */}
        {oauthDialog && (
          <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md flex flex-col justify-center p-6 animate-fadeIn">
            <div className="bg-[#141824] border border-gray-700/80 rounded-2xl p-6 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setOauthDialog(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gray-800 border border-gray-700">
                  {oauthDialog.provider === 'google' ? <GoogleIcon /> : <GitHubIcon />}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>{oauthDialog.title}</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </h4>
                  <p className="text-xs text-gray-400">
                    Authorize Bajarangi Talim via {oauthDialog.provider === 'google' ? 'Google' : 'GitHub'}
                  </p>
                </div>
              </div>

              {/* Fast 1-Click Profile Selection */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                  Quick Select Athlete Account:
                </p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (oauthDialog.provider === 'google') {
                        setOauthCustomEmail('alex.pehlwan@gmail.com');
                        setOauthCustomName('Alex Pehlwan');
                      } else {
                        setOauthCustomEmail('athlete.dev@github.com');
                        setOauthCustomName('Dev Pehlwan');
                      }
                    }}
                    className="w-full text-left p-3 rounded-xl bg-gray-800/80 hover:bg-gray-800 border border-gray-700 hover:border-amber-500/50 flex items-center justify-between transition group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-xs text-white">
                        {oauthDialog.provider === 'google' ? 'AP' : 'DP'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {oauthDialog.provider === 'google' ? 'Alex Pehlwan' : 'Dev Pehlwan'}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {oauthDialog.provider === 'google'
                            ? 'alex.pehlwan@gmail.com'
                            : 'athlete.dev@github.com'}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition" />
                  </button>
                </div>
              </div>

              {/* Custom OAuth details input */}
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={oauthCustomName}
                    onChange={(e) => setOauthCustomName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Account Email
                  </label>
                  <input
                    type="email"
                    value={oauthCustomEmail}
                    onChange={(e) => setOauthCustomEmail(e.target.value)}
                    placeholder={
                      oauthDialog.provider === 'google'
                        ? 'you@gmail.com'
                        : 'you@users.noreply.github.com'
                    }
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setOauthDialog(null)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-gray-700 text-gray-300 hover:text-white text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleOAuthSubmit}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-600/30 transition disabled:opacity-50"
                >
                  {loading ? 'Authorizing...' : `Sign in with ${oauthDialog.provider === 'google' ? 'Google' : 'GitHub'}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
