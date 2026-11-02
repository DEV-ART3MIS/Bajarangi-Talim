import React from 'react';
import { Flame, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUp, Globe, Share2, Video } from 'lucide-react';

const Footer = ({ setActivePage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (page) => {
    setActivePage(page);
    scrollToTop();
  };

  return (
    <footer className="bg-[#080a0e] text-gray-400 border-t border-gray-800/80 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800/70">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <img
                  src="/logo-transparent-sm.png"
                  alt="Hanuman Gym - Bajarangi Talim Logo"
                  className="w-full h-full object-contain bg-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 font-ams leading-none">
                  <span className="text-2xl font-black text-white">बजरंगी</span>
                  <span className="text-2xl font-black text-orange-500">तालीम</span>
                </div>
                <div className="text-[10px] tracking-widest text-amber-400 font-bold uppercase">
                  HANUMAN GYM • ESTD 1982
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Molding warriors since 1982. We combine the raw discipline of traditional Indian Akhada culture with modern strength and conditioning biomechanics.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#instagram" className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/50 transition" title="Instagram">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/50 transition" title="YouTube">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/50 transition" title="Facebook">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('about')} className="hover:text-orange-400 transition">About Our Legacy</button>
              </li>
              <li>
                <button onClick={() => navigate('trainers')} className="hover:text-orange-400 transition">Certified Coaches</button>
              </li>
              <li>
                <button onClick={() => navigate('pricing')} className="hover:text-orange-400 transition">Membership Tiers</button>
              </li>
              <li>
                <button onClick={() => navigate('exercises')} className="hover:text-orange-400 transition">Exercise Library & Videos</button>
              </li>
              <li>
                <button onClick={() => navigate('bmi')} className="hover:text-orange-400 transition">Interactive BMI Calculator</button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-orange-400 transition">Contact & Free Trial</button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Training Hours</span>
            </h4>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800/80">
                <div className="font-semibold text-gray-200">Monday — Saturday</div>
                <div className="text-xs text-orange-400 mt-1 flex justify-between">
                  <span>Morning: 5:00 AM – 12:00 PM</span>
                </div>
                <div className="text-xs text-orange-400 mt-0.5 flex justify-between">
                  <span>Evening: 4:00 PM – 10:30 PM</span>
                </div>
              </div>
              <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800/80">
                <div className="font-semibold text-gray-200">Sunday Akhada Session</div>
                <div className="text-xs text-amber-400 mt-1">6:00 AM – 1:00 PM (Mud Pit & Gada)</div>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Talim Location</span>
            </h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-start space-x-2 text-xs leading-relaxed">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Post Office, Ghulewadi, Tal-Sangamner, Near Ahmednagar, Amrutvahini College, Amrutnagar, Ghulewadi, Maharashtra 422608</span>
              </p>
              <p className="flex items-center space-x-2 text-xs">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 98765 43210 / 020-2567890</span>
              </p>
              <p className="flex items-center space-x-2 text-xs">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>warriors@bajarangitalim.com</span>
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Admissions Open for New Batch</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} बजरंगी तालीम (Bajarangi Talim). All rights reserved. Powered by Node.js, Express & MongoDB Atlas.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Crafted for true strength</span>
              <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500 inline" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
