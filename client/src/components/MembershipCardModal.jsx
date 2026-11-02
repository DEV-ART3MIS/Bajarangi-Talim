import React from 'react';
import { X, Flame, Shield, CheckCircle2, QrCode, Calendar, Sparkles, Printer } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MembershipCardModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  const memberId = user.id ? `BT-TALIM-${user.id.toString().slice(-6).toUpperCase()}` : 'BT-TALIM-982001';
  const joinDate = user.joinDate ? new Date(user.joinDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '15 Jan 2025';
  const expiryDate = user.expiryDate ? new Date(user.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '15 Jan 2027';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0e121a] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[10px] font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Official Digital Member Pass</span>
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">
            Bajarangi Talim Turnstile Access
          </h3>
          <p className="text-xs text-gray-400">Scan at gym turnstile or present to front desk</p>
        </div>

        {/* The Card */}
        <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#161b26] via-[#10141d] to-[#1c2230] border-2 border-orange-500/40 shadow-2xl overflow-hidden box-glow">
          {/* Card Watermark */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Flame className="w-48 h-48 text-orange-500" />
          </div>

          {/* Top Row */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-700/60">
            <div className="flex items-center space-x-2.5">
              <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-amber-500/60 shadow-md flex-shrink-0 bg-black">
                <img
                  src="/logo.png"
                  alt="Hanuman Gym Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-black font-ams text-white">बजरंगी तालीम</div>
                <div className="text-[9px] tracking-widest text-amber-400 uppercase font-bold">HANUMAN GYM • PEHLWAN ATHLETICS</div>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
              user.status === 'Active' 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
            }`}>
              ● {user.status}
            </span>
          </div>

          {/* Member Details */}
          <div className="py-5 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Warrior Name</span>
              <div className="text-xl font-black text-white tracking-wide uppercase">{user.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Member ID</span>
                <span className="font-mono font-bold text-orange-400">{memberId}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Plan Tier</span>
                <span className="font-bold text-amber-300">{user.membershipPlan}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Member Since</span>
                <span className="text-gray-300 font-medium">{joinDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Valid Until</span>
                <span className="text-gray-300 font-medium">{expiryDate}</span>
              </div>
            </div>

            {user.fitnessGoal && (
              <div className="pt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Specialization / Goal</span>
                <span className="text-xs text-orange-300 font-semibold">{user.fitnessGoal}</span>
              </div>
            )}
          </div>

          {/* Card Bottom QR / Barcode */}
          <div className="pt-4 border-t border-gray-700/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                <QrCode className="w-10 h-10 text-black" />
              </div>
              <div className="text-[9px] text-gray-400 space-y-0.5">
                <div className="font-mono text-gray-300 font-bold">DIGITAL BADGE</div>
                <div>SECURE NFC / QR READY</div>
                <div className="text-orange-400">GHULEWADI, SANGAMNER</div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] text-gray-500 uppercase font-mono block">VERIFIED PASS</span>
              <Shield className="w-5 h-5 text-emerald-400 inline mt-1" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipCardModal;

