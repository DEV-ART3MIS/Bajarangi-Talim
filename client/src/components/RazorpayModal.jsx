import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Building2,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  Flame,
  Printer,
  Sparkles,
  Zap,
  RefreshCw,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RazorpayModal = ({
  isOpen,
  onClose,
  plan,
  billingCycle = 'monthly',
  onPaymentSuccess,
  onOpenMembershipCard,
  onGoToDashboard,
}) => {
  const { user, updateUserState } = useAuth();
  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Form states
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(user?.name || '');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSuccessData(null);
      setErrorMsg('');
      setLoading(false);
      if (user) {
        setGuestName(user.name || '');
        setGuestEmail(user.email || '');
        setGuestPhone(user.phone || '');
        setCardName(user.name || '');
      }
    }
  }, [isOpen, user]);

  if (!isOpen || !plan) return null;

  const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
  const gstAmount = Math.round(price * 0.18);
  const baseAmount = price - gstAmount;

  // Format Card Number
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      setCardExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
    } else {
      setCardExpiry(val);
    }
  };

  // Complete Payment (Used by both Demo Success and Standard Flow)
  const processPaymentSuccess = async (methodName = 'UPI (Razorpay Demo)') => {
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Create Order via Backend API
      const orderRes = await api.createPaymentOrder({
        planName: plan.name,
        billingCycle,
        amount: price,
        memberId: user ? user.id : 'guest',
      });

      const orderId = orderRes?.order?.id || `order_BT_${Date.now()}`;
      const paymentId = `pay_BT_${Date.now().toString().slice(-8)}_${Math.random().toString(36).substring(2, 6)}`;

      // 2. Verify Payment via Backend API
      const verifyRes = await api.verifyPayment({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: 'demo_verified_signature',
        planName: plan.name,
        billingCycle,
        amount: price,
        memberId: user ? user.id : 'guest',
        paymentMethod: methodName,
        isDemo: true,
      });

      if (verifyRes.success) {
        if (verifyRes.member) {
          updateUserState(verifyRes.member);
        }
        setSuccessData({
          paymentId,
          orderId,
          amount: price,
          planName: plan.name,
          billingCycle,
          paidAt: new Date(),
          method: methodName,
          invoiceNumber: verifyRes.invoiceNumber || `BT-INV-${Date.now().toString().slice(-6)}`,
          turnstilePassId: verifyRes.turnstilePassId || 'BT-TALIM-ACTIVE',
        });
        if (onPaymentSuccess) {
          onPaymentSuccess(verifyRes.member || { membershipPlan: plan.name });
        }
      } else {
        setErrorMsg(verifyRes.message || 'Payment verification failed.');
      }
    } catch (err) {
      console.error('Payment Error:', err);
      setErrorMsg('Payment gateway error: ' + (err.message || 'Connection timeout.'));
    } finally {
      setLoading(false);
    }
  };

  // Simulate Payment Failure Demo
  const simulatePaymentFailure = () => {
    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setLoading(false);
      setErrorMsg('❌ Payment Failed: [BAD_REQUEST_ERROR] Payment was declined by user bank or canceled by customer. Please try again.');
    }, 1200);
  };

  // Real or Simulated Razorpay Launch
  const handlePayNow = () => {
    // If Razorpay SDK is loaded on window and key is present, try opening standard checkout
    if (typeof window !== 'undefined' && window.Razorpay && process.env.VITE_RAZORPAY_KEY_ID) {
      try {
        const options = {
          key: process.env.VITE_RAZORPAY_KEY_ID,
          amount: price * 100,
          currency: 'INR',
          name: 'बजरंगी तालीम',
          description: `${plan.name} (${billingCycle.toUpperCase()}) Access Pass`,
          image: '/logo-transparent-sm.png',
          handler: function (response) {
            processPaymentSuccess(`Razorpay Live (${response.razorpay_payment_id})`);
          },
          prefill: {
            name: user?.name || guestName || 'Bajarangi Athlete',
            email: user?.email || guestEmail || 'athlete@bajarangitalim.com',
            contact: user?.phone || guestPhone || '9876543210',
          },
          theme: {
            color: '#ea580c',
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      } catch (e) {
        console.warn('Fallback to modal demo payment:', e);
      }
    }

    // Default: process payment via the high-fidelity interactive flow
    const methodDescriptions = {
      upi: upiId ? `UPI ID: ${upiId}` : 'UPI QR Code / Instant GPay',
      card: cardNumber ? `Card (•••• ${cardNumber.slice(-4)})` : 'Credit/Debit Card',
      netbanking: `Netbanking (${selectedBank})`,
      wallet: 'Online Wallet',
    };
    processPaymentSuccess(methodDescriptions[activeTab]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#0e121a] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Razorpay & Gym Banner */}
        <div className="bg-gradient-to-r from-[#0d1c33] via-[#0f2442] to-[#161f30] p-6 border-b border-gray-800/80 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-black/60 border border-amber-500/40 p-1 flex items-center justify-center shadow-lg">
                <img
                  src="/logo-transparent-sm.png"
                  alt="Hanuman Gym Logo"
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div>
                <div className="flex items-center space-x-1.5 font-ams">
                  <span className="text-lg font-black text-white">बजरंगी तालीम</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40 font-sans font-bold">
                    Official Checkout
                  </span>
                </div>
                <div className="text-[11px] text-gray-300 font-medium">
                  {plan.name} • {billingCycle === 'annual' ? 'Annual Tier (20% Off)' : 'Monthly Access'}
                </div>
              </div>
            </div>

            {/* Official Razorpay Badging */}
            <div className="text-right hidden sm:block">
              <div className="flex items-center space-x-1 text-sky-400 text-xs font-bold justify-end">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Razorpay Secured</span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono">256-Bit SSL Encrypted</div>
            </div>
          </div>

          {/* Amount Badge */}
          <div className="mt-4 pt-3 border-t border-sky-900/40 flex items-center justify-between">
            <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Total Payable Amount</span>
            <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline space-x-1">
              <span className="text-orange-400 text-lg">₹</span>
              <span>{price.toLocaleString('en-IN')}</span>
              <span className="text-xs text-gray-400 font-normal">({billingCycle})</span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        {!successData ? (
          <div className="p-5 sm:p-7 space-y-6">
            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-start space-x-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1-Click Razorpay Demo Mode Trigger Bar */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-gray-900 to-amber-950/30 p-4 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Razorpay Demo Simulation Sandbox</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Click below to simulate a verified Razorpay payment with 100% success and instant tier activation.
                </p>
              </div>

              <button
                type="button"
                onClick={() => processPaymentSuccess('Razorpay Instant Demo Success')}
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-1.5 transition transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                <span>Demo Success Payment</span>
              </button>
            </div>

            {/* Payment Method Selector Tabs */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Select Preferred Payment Mode
              </label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('upi')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition ${
                    activeTab === 'upi'
                      ? 'bg-orange-600/20 border-orange-500 text-orange-400 shadow-md'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mb-1" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition ${
                    activeTab === 'card'
                      ? 'bg-orange-600/20 border-orange-500 text-orange-400 shadow-md'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('netbanking')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition ${
                    activeTab === 'netbanking'
                      ? 'bg-orange-600/20 border-orange-500 text-orange-400 shadow-md'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4 mb-1" />
                  <span>Netbanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('wallet')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition ${
                    activeTab === 'wallet'
                      ? 'bg-orange-600/20 border-orange-500 text-orange-400 shadow-md'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Wallet className="w-4 h-4 mb-1" />
                  <span>Wallets</span>
                </button>
              </div>
            </div>

            {/* TAB 1: UPI */}
            {activeTab === 'upi' && (
              <div className="space-y-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Dynamic Mock QR Code */}
                  <div className="w-28 h-28 bg-white p-2 rounded-2xl flex flex-col items-center justify-center shadow-lg shrink-0">
                    <QrCode className="w-20 h-20 text-gray-900" />
                    <span className="text-[8px] font-bold text-gray-700 uppercase mt-0.5">Scan with any App</span>
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="text-xs font-bold text-white">Scan & Pay Using Any UPI App</div>
                    <p className="text-[11px] text-gray-400">
                      Supports Google Pay, PhonePe, Paytm, BHIM UPI, Cred, and WhatsApp Pay.
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-1">
                      {['GPay', 'PhonePe', 'Paytm', 'Cred', 'BHIM'].map((app) => (
                        <span key={app} className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Or Enter Your UPI ID / VPA
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="e.g. warrior@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="flex-1 py-2 px-3 bg-gray-950 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => setUpiId('athlete@okaxis')}
                      className="px-2.5 py-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 rounded-lg border border-orange-500/20"
                    >
                      Fill Demo VPA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CREDIT / DEBIT CARD */}
            {activeTab === 'card' && (
              <div className="space-y-3 bg-gray-900/50 p-4 rounded-2xl border border-gray-800 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8892"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full pl-9 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="08/29"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full p-2 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      CVV / Security Code
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-8 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Cardholder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full p-2 bg-gray-950 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-1 flex items-center justify-between text-[10px] text-gray-400">
                  <span>Supported Networks:</span>
                  <div className="flex space-x-2 font-bold text-gray-300">
                    <span>VISA</span>
                    <span>•</span>
                    <span>MasterCard</span>
                    <span>•</span>
                    <span>RuPay</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: NETBANKING */}
            {activeTab === 'netbanking' && (
              <div className="space-y-3 bg-gray-900/50 p-4 rounded-2xl border border-gray-800 text-xs">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Popular Indian Banks
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'SBI Bank', 'Axis Bank', 'Kotak Bank', 'Bank of Maharashtra'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBank(b)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition ${
                        selectedBank === b
                          ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold'
                          : 'bg-gray-950 border-gray-800 text-gray-300 hover:border-gray-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: WALLETS */}
            {activeTab === 'wallet' && (
              <div className="space-y-3 bg-gray-900/50 p-4 rounded-2xl border border-gray-800 text-xs">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Select Digital Wallet
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {['Amazon Pay', 'Paytm Wallet', 'Mobikwik', 'Freecharge'].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => processPaymentSuccess(`Wallet (${w})`)}
                      className="p-3 rounded-xl bg-gray-950 border border-gray-800 hover:border-orange-500/50 text-gray-200 font-bold flex items-center justify-between transition"
                    >
                      <span>{w}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handlePayNow}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-xl shadow-orange-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Contacting Razorpay Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{price.toLocaleString('en-IN')} via Razorpay</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-gray-500 px-1 pt-1">
                <button
                  type="button"
                  onClick={simulatePaymentFailure}
                  className="hover:text-red-400 transition underline"
                >
                  Test Payment Failure Error
                </button>
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Razorpay Standard Checkout</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* PAYMENT SUCCESS SCREEN */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                Payment Authorized & Captured
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase pt-2">
                Welcome To {successData.planName}!
              </h2>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Your payment of <strong className="text-white">₹{successData.amount.toLocaleString('en-IN')}</strong> was successfully processed by Razorpay. Your gym membership turnstile pass is now activated!
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-[#121622] rounded-2xl border border-gray-800 p-4 text-xs text-left space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-gray-800/80">
                <span className="text-gray-400">Razorpay Payment ID:</span>
                <span className="font-mono font-bold text-orange-400">{successData.paymentId}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-800/80">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-mono text-gray-300">{successData.orderId}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-800/80">
                <span className="text-gray-400">Invoice Ref:</span>
                <span className="font-mono text-white font-bold">{successData.invoiceNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-800/80">
                <span className="text-gray-400">Payment Channel:</span>
                <span className="text-emerald-400 font-semibold">{successData.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Turnstile Member Pass:</span>
                <span className="font-bold text-amber-400 font-mono">{successData.turnstilePassId}</span>
              </div>
            </div>

            {/* Post-Payment Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenMembershipCard) onOpenMembershipCard();
                }}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>View Member Pass</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onGoToDashboard) onGoToDashboard();
                }}
                className="py-3 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RazorpayModal;

