import React, { useState } from 'react';
import { Award, CheckCircle2, Flame, Calendar, Dumbbell, ShieldCheck, Mail, Phone, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TrainersPage = ({ setActivePage }) => {
  const { user, openAuthModal } = useAuth();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [consultationBooked, setConsultationBooked] = useState(false);

  const trainers = [
    {
      id: 'baliram-kotkar',
      name: 'Baliram Kotkar',
      role: 'Chief Ustad & Head Pehlwan (Gym Owner)',
      experience: '20+ Years Legacy',
      badge: 'Rustam-e-Hind Heritage Coach',
      image: '/trainers/baliram-kotkar.jpg',
      specialties: ['Traditional Mud Akhada Kushti', 'Sacred Gada & Mudgar Mastery', 'Ancient Spinal Fortitude & Surya Dand'],
      certifications: ['Senior Akhada Pehlwan Ustad Credential', 'Maharashtra State Wrestling Mentor'],
      quote: 'When your feet sink into the holy red soil, you inherit the raw power, humility, and unbreakable spirit of Bajrang Bali.',
    },
    {
      id: 'nikhil-kotkar',
      name: 'Nikhil Kotkar',
      role: 'Head Strength & Conditioning Coach',
      experience: '10+ Years Elite Coaching',
      badge: 'CSCS® Certified Strength Coach',
      image: '/trainers/nikhil-kotkar.jpg',
      specialties: ['Maximal Powerlifting (Squat, Bench, Deadlift)', 'Barbell Kinematics & Hypertrophy', 'Athletic Conditioning & Contest Prep'],
      certifications: ['Certified Strength & Conditioning Specialist (CSCS)', 'National Powerlifting Champion & Master Trainer'],
      quote: 'Leave your ego outside the iron gate. Progressive overload, razor-sharp technique, and relentless discipline build true titans.',
    },
    {
      id: 'shyam-kotkar',
      name: 'Shyam Kotkar',
      role: 'Traditional Gada Master & Calisthenics Specialist',
      experience: '8+ Years Coaching',
      badge: 'Gada & Bodyweight Master',
      image: '/trainers/shyam-kotkar.jpg',
      specialties: ['Heavy Gada (Mace) Rotational Swings', 'High-Volume Bodyweight Calisthenics', 'Rotator Cuff Resilience & Grip Strength'],
      certifications: ['Traditional Akhada Implements Master', 'Advanced Movement & Functional Mobility L2'],
      quote: 'Commanding your own bodyweight and rotating heavy steel or stone maces builds bulletproof armor that machine workouts can never replicate.',
    },
  ];

  const handleBook = (trainer) => {
    setSelectedTrainer(trainer);
    setConsultationBooked(false);
  };

  const confirmBooking = (e) => {
    e.preventDefault();
    setConsultationBooked(true);
    setTimeout(() => {
      setSelectedTrainer(null);
      setConsultationBooked(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest">
          <Award className="w-3.5 h-3.5" />
          <span>The Champions Behind Champions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Meet Our Master Trainers & Coaches
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          At Bajarangi Talim, coaching is not a commercial sales gig; it is a sacred apprenticeship. Every trainer is an accomplished athlete committed to guiding your transformation safely and aggressively.
        </p>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-[#121622] rounded-3xl border border-gray-800 overflow-hidden flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 shadow-xl group"
          >
            <div>
              {/* Photo & Badge */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-600/90 text-white shadow-md">
                    {trainer.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block">
                    {trainer.experience}
                  </span>
                  <h3 className="text-xl font-black text-white">{trainer.name}</h3>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 space-y-4">
                <div className="text-xs font-bold text-gray-300 border-b border-gray-800 pb-3">
                  {trainer.role}
                </div>

                {/* Specialties */}
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-2">
                    Key Specialties
                  </span>
                  <div className="space-y-1.5">
                    {trainer.specialties.map((spec, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-gray-300">
                        <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">
                    Accreditations
                  </span>
                  {trainer.certifications.map((cert, i) => (
                    <div key={i} className="text-[11px] text-gray-300 flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs text-gray-400 italic bg-black/40 p-3 rounded-xl border border-gray-800/80">
                  "{trainer.quote}"
                </p>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-6 pt-0">
              <button
                onClick={() => handleBook(trainer)}
                className="w-full py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider border border-gray-700 hover:border-orange-500 transition shadow-md"
              >
                Book 1-on-1 Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Booking Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#121622] border border-gray-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {consultationBooked ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">Consultation Requested!</h3>
                <p className="text-xs text-gray-300">
                  Our front desk and {selectedTrainer.name} will reach out to confirm your session slot.
                </p>
              </div>
            ) : (
              <form onSubmit={confirmBooking} className="space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-800">
                  <img
                    src={selectedTrainer.image}
                    alt={selectedTrainer.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-black text-white">{selectedTrainer.name}</h4>
                    <span className="text-[11px] text-orange-400">{selectedTrainer.role}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    defaultValue={user ? user.name : ''}
                    placeholder="Enter your name"
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Email or Phone</label>
                  <input
                    type="text"
                    required
                    defaultValue={user ? user.email : ''}
                    placeholder="Enter email or phone"
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Preferred Time Slot</label>
                  <select className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white text-xs">
                    <option>Morning (6:00 AM - 9:00 AM)</option>
                    <option>Mid-Day (10:00 AM - 12:00 PM)</option>
                    <option>Evening (5:00 PM - 8:00 PM)</option>
                    <option>Night (8:00 PM - 10:00 PM)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs uppercase tracking-wider shadow-lg"
                >
                  Confirm Free Assessment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainersPage;

