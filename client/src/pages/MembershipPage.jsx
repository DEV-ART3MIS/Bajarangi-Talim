import React, { useState } from 'react';
import {
  CheckCircle2,
  Flame,
  Sparkles,
  Shield,
  Zap,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Lock,
  Smartphone,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import RazorpayModal from '../components/RazorpayModal';

const MembershipPage = ({ setActivePage, onOpenMembershipCard }) => {
  const { user, openAuthModal, updateUserState } = useAuth();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState('');
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Akhada Starter',
      tagline: 'Ideal for beginners & traditional bodyweight enthusiasts',
      priceMonthly: 1499,
      priceAnnual: 14390,
      monthlyBreakdownAnnual: 1199,
      features: [
        'Full Open Gym Access (Barbells, Dumbbells, Cages)',
        'Weekly Sunday Traditional Akhada Mud Pit Session',
        'Standard Locker & Shower Access',
        'Digital Bajarangi Member Turnstile Pass',
        'General Fitness & Warm-up Assessment',
      ],
      notIncluded: [
        'Personal Coaching Sessions',
        'Steam & Bio-Recovery Lounge',
        'Custom Nutrition Blueprints',
      ],
      popular: false,
    },
    {
      id: 'warrior',
      name: 'Warrior Pro',
      tagline: 'Our flagship tier for dedicated strength athletes & pehlwans',
      priceMonthly: 2499,
      priceAnnual: 23990,
      monthlyBreakdownAnnual: 1999,
      features: [
        'Everything in Akhada Starter Tier',
        'Olympic Weightlifting Platforms & Calisthenics Rig Access',
        'Unlimited Traditional Gada & Pehlwan Conditioning Classes',
        'Cedarwood Steam Sauna & Hydrotherapy Lounge',
        'Monthly Biometric & Body Composition Check-in',
        'Full Access to Digital Exercise Library & Form Guides',
      ],
      notIncluded: [
        'Weekly 1-on-1 Personal Coaching',
        'Custom Nutrition Blueprint',
      ],
      popular: true,
    },
    {
      id: 'elite',
      name: 'Bajarangi Elite',
      tagline: 'Total athletic mastery with dedicated mentorship',
      priceMonthly: 4499,
      priceAnnual: 42990,
      monthlyBreakdownAnnual: 3580,
      features: [
        'Everything in Warrior Pro Tier',
        'Weekly 1-on-1 Personal Coaching Session with Master Coaches',
        'Custom Macro Nutritional Blueprint & Supplementation Guidance',
        'Contrast Ice Plunge & Percussion Therapy Access',
        '4 Complimentary Guest Passes per Month',
        'Complimentary Bajarangi Gym Kit (Apparel, Shaker & Straps)',
      ],
      notIncluded: [],
      popular: false,
    },
  ];

  const handleOpenRazorpay = (plan) => {
    setSelectedPlanForPayment(plan);
    setIsRazorpayModalOpen(true);
  };

  const handleSelectPlan = async (plan) => {
    // Open Razorpay Payment Modal
    handleOpenRazorpay(plan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Warrior Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Invest In Your Strength & Character
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          No hidden joining fees. No long lock-in gimmicks. Pure value backed by world-class coaching, raw Akhada heritage, and state-of-the-art facilities.
        </p>

        {/* Billing Switch */}
        <div className="pt-6 flex items-center justify-center space-x-4">
          <span className={`text-xs font-bold uppercase tracking-wider ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-14 h-7 rounded-full bg-gray-800 p-1 relative border border-gray-700 transition"
          >
            <div
              className={`w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-md transition-transform ${
                billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
              }`}
            ></div>
          </button>
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${billingCycle === 'annual' ? 'text-white' : 'text-gray-500'}`}>
              Annual
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Save 20%
            </span>
          </div>
        </div>

        {/* Razorpay Gateway Badges & Demo Trigger */}
        <div className="pt-3 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#121622]/90 border border-sky-900/40 text-xs">
          <div className="flex items-center space-x-2 text-sky-400 font-bold">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Razorpay Payments Enabled</span>
            <span className="text-gray-400 font-normal">| UPI • Cards • NetBanking</span>
          </div>
          <button
            type="button"
            onClick={() => handleOpenRazorpay(plans[1])}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1.5 transition"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Demo Payment</span>
          </button>
        </div>
      </div>

      {upgradeSuccess && (
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center text-sm font-bold flex items-center justify-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>{upgradeSuccess}</span>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isCurrent = user && user.membershipPlan === plan.name;
          const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
          const monthlyEquiv = billingCycle === 'annual' ? plan.monthlyBreakdownAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#181e2b] to-[#121622] border-2 border-orange-500/60 shadow-2xl box-glow lg:-translate-y-2'
                  : 'bg-[#121622] border border-gray-800 shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg">
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-black text-white uppercase">{plan.name}</h3>
                  {plan.popular && <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />}
                </div>

                <p className="text-xs text-gray-400 min-h-[32px]">{plan.tagline}</p>

                {/* Price Display */}
                <div className="py-6 border-y border-gray-800/80 my-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      / {billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <div className="text-[11px] text-orange-400 font-semibold mt-1">
                      Equivalent to ₹{monthlyEquiv.toLocaleString('en-IN')}/mo (Billed annually)
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">
                    What is Included:
                  </span>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}

                  {plan.notIncluded.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-gray-600 line-through">
                      <span className="w-4 h-4 rounded-full border border-gray-700 flex items-center justify-center shrink-0 text-[10px] text-gray-600 mt-0.5">✕</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={loadingPlan === plan.name}
                  className={`w-full py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center justify-center space-x-1.5 ${
                    isCurrent
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                      : plan.popular
                      ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white shadow-orange-600/30'
                      : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 opacity-80" />
                  <span>
                    {isCurrent
                      ? '● Your Current Active Plan'
                      : user
                      ? `Switch to ${plan.name} • ₹${price.toLocaleString('en-IN')}`
                      : `Join with ${plan.name} • ₹${price.toLocaleString('en-IN')}`}
                  </span>
                </button>
                <div className="text-center mt-2">
                  <span className="text-[10px] text-gray-500 flex items-center justify-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500/70" />
                    <span>Instant Razorpay Checkout & Demo Enabled</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Razorpay Interactive Modal */}
      <RazorpayModal
        isOpen={isRazorpayModalOpen}
        onClose={() => setIsRazorpayModalOpen(false)}
        plan={selectedPlanForPayment}
        billingCycle={billingCycle}
        onPaymentSuccess={(updatedMember) => {
          setUpgradeSuccess(`🎉 Razorpay payment confirmed! Subscribed to ${selectedPlanForPayment?.name}.`);
          setTimeout(() => setUpgradeSuccess(''), 5000);
        }}
        onOpenMembershipCard={onOpenMembershipCard}
        onGoToDashboard={() => {
          setIsRazorpayModalOpen(false);
          setActivePage('dashboard');
        }}
      />

      {/* Gym Membership FAQs */}
      <div className="max-w-4xl mx-auto space-y-6 pt-10">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-xs mt-1">Everything you need to know before stepping into the Talim</p>
        </div>

        <div className="space-y-3">
          <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
            <h4 className="text-sm font-bold text-white mb-1.5">Do I need prior wrestling experience to join?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Not at all! 70% of our members join for conventional strength, fat loss, and muscle hypertrophy. The Akhada mud pit and Gada swings are taught progressively from scratch by our masters.
            </p>
          </div>

          <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
            <h4 className="text-sm font-bold text-white mb-1.5">Can I pause or freeze my membership if I travel?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Yes, all Annual memberships can be paused for up to 45 days at no additional fee via your Member Dashboard or at the front desk.
            </p>
          </div>

          <div className="bg-[#121622] p-5 rounded-2xl border border-gray-800">
            <h4 className="text-sm font-bold text-white mb-1.5">Are locker rooms, showers, and parking available?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Yes, our facility includes dedicated male & female changing rooms with hot showers, digital secure lockers, and free dedicated parking for two-wheelers and four-wheelers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;

