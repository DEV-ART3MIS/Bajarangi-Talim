import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ContactPage = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [subject, setSubject] = useState('Free 1-Day Trial Session');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await api.submitContact({
        name,
        email,
        phone,
        subject,
        message,
      });

      if (res.success) {
        setSuccess(res.message || 'Thank you! Your message has been received.');
        setMessage('');
        if (!user) {
          setName('');
          setEmail('');
          setPhone('');
        }
      } else {
        setError(res.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Visit Bajarangi Talim or Request A Trial
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Have questions about memberships, traditional mud akhada sessions, or personal training? Reach out to our front desk team or drop by our training grounds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#121622] rounded-3xl border border-gray-800 p-6 sm:p-10 shadow-2xl relative">
          <h2 className="text-2xl font-black text-white uppercase mb-2">Send Us A Message</h2>
          <p className="text-xs text-gray-400 mb-6">
            We respond to inquiries within 24 hours. Your details are safe with us.
          </p>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sagar Deshmukh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sagar@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Subject / Inquiry Type
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="Free 1-Day Trial Session">Free 1-Day Trial Session</option>
                  <option value="Membership Plans & Pricing">Membership Plans & Pricing</option>
                  <option value="Traditional Akhada Gada Training">Traditional Akhada Gada Training</option>
                  <option value="Personal Coaching Request">Personal Coaching Request</option>
                  <option value="Corporate / Team Fitness">Corporate / Team Fitness</option>
                  <option value="Other Inquiries">Other Inquiries</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us about your fitness goals or questions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Send Inquiry'}</span>
            </button>
          </form>
        </div>

        {/* Location & Info Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#121622] rounded-3xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-black text-white uppercase">Headquarters Info</h3>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Gym Address</div>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    Post Office, Ghulewadi, Tal-Sangamner, Near Ahmednagar, Amrutvahini College, Amrutnagar, Ghulewadi, Maharashtra 422608
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Operational Timings</div>
                  <div className="text-xs text-gray-400 mt-0.5 space-y-0.5">
                    <div>Mon – Sat: 5:00 AM – 12:00 PM & 4:00 PM – 10:30 PM</div>
                    <div>Sunday: 6:00 AM – 1:00 PM (Mud Akhada & Gada Focus)</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Direct Phone & WhatsApp</div>
                  <p className="text-xs text-gray-400 mt-0.5">+91 98765 43210 / 02425-259000</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Email Support</div>
                  <p className="text-xs text-gray-400 mt-0.5">warriors@bajarangitalim.com</p>
                </div>
              </div>
            </div>

            {/* Stylized Map View Embed */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 aspect-[16/9] shadow-inner group">
              <iframe
                title="Bajarangi Talim Ghulewadi Sangamner Location Map"
                src="https://maps.google.com/maps?q=Ghulewadi,%20Amrutnagar,%20Sangamner,%20Maharashtra%20422608&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale-[50%] contrast-[120%] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition duration-300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-800 text-[11px] text-gray-300 flex items-center justify-between pointer-events-none">
                <span className="font-bold text-orange-400">Near Amrutvahini College, Ghulewadi</span>
                <span className="text-[10px] text-gray-400">Sangamner 422608</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

