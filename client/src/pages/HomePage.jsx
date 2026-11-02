import React from 'react';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import { motion } from 'motion/react';
import {
  Flame,
  Dumbbell,
  Shield,
  Award,
  Zap,
  ArrowRight,
  CheckCircle2,
  Users,
  Activity,
  HeartPulse,
  Sparkles,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BMICalculator from '../components/BMICalculator';

const HomePage = ({ setActivePage, onOpenExercise }) => {
  const { openAuthModal, user } = useAuth();

  const features = [
    {
      icon: Flame,
      title: 'Sacred Akhada Heritage',
      description: 'Train in our authentic red-soil mud arena with traditional Sheesham Gada (maces), heavy wooden clubs, and Pehlwan conditioning rituals.',
      tag: 'Raw Culture'
    },
    {
      icon: Dumbbell,
      title: 'Olympic Strength Zone',
      description: 'Competition-grade calibrated barbells, dedicated deadlift platforms, power cages, and dumbbells ranging from 2.5 kg up to 60 kg.',
      tag: 'Biomechanics'
    },
    {
      icon: Zap,
      title: 'Calisthenics & Agility Rig',
      description: 'Multi-tier monkey bars, gymnastic rings, parallel dip stations, and climbing ropes designed for functional, gravity-defying body control.',
      tag: 'Bodyweight'
    },
    {
      icon: HeartPulse,
      title: 'Bio-Recovery & Steam Lounge',
      description: 'Complete your brutal training with cedarwood steam rooms, hydrotherapy contrast baths, and deep tissue massage gun stations.',
      tag: 'Regeneration'
    }
  ];

  const featuredWorkouts = [
    {
      id: 'gada-swing',
      name: 'Bajarangi Gada (Mace) Swing',
      category: 'Akhada Heritage',
      muscle: 'Shoulders & Core',
      intensity: 'High Power',
      img: '/akhada/akhada-kushti.jpg',
    },
    {
      id: 'dand-hindu-pushup',
      name: 'Surya Dand (Hindu Push-Up)',
      category: 'Akhada Heritage',
      muscle: 'Chest & Core',
      intensity: 'Endurance',
      img: '/akhada/akhada-training.jpg',
    },
    {
      id: 'barbell-bench-press',
      name: 'Flat Barbell Bench Press',
      category: 'Strength',
      muscle: 'Chest & Triceps',
      intensity: 'Hypertrophy',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'deadlift-conventional',
      name: 'Barbell Conventional Deadlift',
      category: 'Strength',
      muscle: 'Posterior Chain',
      intensity: 'Maximal Power',
      img: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const testimonials = [
    {
      name: 'Mahesh Jadhav',
      role: 'National Powerlifting Medalist',
      text: 'Bajarangi Talim provided me the grit that commercial luxury gyms never could. The energy in the Akhada pit alongside Olympic barbells is electrifying.',
      badge: '5 Years Member'
    },
    {
      name: 'Dr. Radhika Kulkarni',
      role: 'Sports Orthopedic & Crossfit Athlete',
      text: 'Their blend of ancient Indian rotational gada training and modern progressive overload fixed my persistent rotator cuff issues in 3 months.',
      badge: 'Warrior Pro Member'
    },
    {
      name: 'Tanmay Salunkhe',
      role: 'State Level Kushti Wrestler',
      text: 'Baliram Kotkar, Nikhil, and Shyam treat every trainee like family. The discipline here transformed not just my physique, but my entire mindset.',
      badge: 'Elite Athlete'
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center hero-gradient pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient background glowing orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Hero Logo Emblem */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-amber-500/60 shadow-2xl shadow-orange-500/30 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 bg-black">
                <img
                  src="/logo.png"
                  alt="Hanuman Gym - Bajarangi Talim Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 blur-xl opacity-40 group-hover:opacity-75 transition -z-10"></div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-bold uppercase tracking-widest animate-pulse">
            <Flame className="w-4 h-4 fill-orange-400" />
            <span>The Sacred Temple of Strength & Akhada Heritage</span>
          </div>

          {/* Main Title with LayoutTextFlip */}
          <motion.div
            className="relative mx-auto flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.15]">
              <LayoutTextFlip
                text="FORGE "
                words={[
                  "UNBREAKABLE",
                  "DIVINE PEHLWAN",
                  "ANCIENT AKHADA",
                  "RELENTLESS",
                  "WARRIOR",
                ]}
                suffix="POWER & DISCIPLINE"
                textClassName="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight"
                wordClassName="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 flame-glow uppercase"
                suffixClassName="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight"
              />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-gray-300 font-normal leading-relaxed">
            Welcome to <strong className="text-white font-bold font-ams tracking-wider text-xl sm:text-2xl">बजरंगी तालीम</strong> — where traditional Indian Akhada soul meets elite sports science. Master the ancient Gada swings, Surya Dand, and heavy Olympic iron under champion coaches.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => (user ? setActivePage('pricing') : openAuthModal('register'))}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-base uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-xl shadow-orange-600/30 transition transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2"
            >
              <span>{user ? 'View Membership Tiers' : 'Claim Free Day Pass'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActivePage('exercises')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-gray-200 bg-gray-900/80 hover:bg-gray-800 border border-gray-700/80 hover:border-gray-600 transition flex items-center justify-center space-x-2"
            >
              <Dumbbell className="w-5 h-5 text-orange-400" />
              <span>Explore Exercise Library</span>
            </button>
          </div>

          {/* Live Gym Stats Counters */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-[#121622]/80 backdrop-blur-md p-5 rounded-2xl border border-gray-800 text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">40+</div>
              <div className="text-xs uppercase font-bold text-orange-400 mt-1 tracking-wider">Years of Legacy</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Est. 1982 by Master Pehlwans</div>
            </div>

            <div className="bg-[#121622]/80 backdrop-blur-md p-5 rounded-2xl border border-gray-800 text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">1,450+</div>
              <div className="text-xs uppercase font-bold text-amber-400 mt-1 tracking-wider">Active Members</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Powerlifters & Athletes</div>
            </div>

            <div className="bg-[#121622]/80 backdrop-blur-md p-5 rounded-2xl border border-gray-800 text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">12,000</div>
              <div className="text-xs uppercase font-bold text-orange-400 mt-1 tracking-wider">Sq. Ft Training Arena</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Pit, Free Weights & Rig</div>
            </div>

            <div className="bg-[#121622]/80 backdrop-blur-md p-5 rounded-2xl border border-gray-800 text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">100%</div>
              <div className="text-xs uppercase font-bold text-emerald-400 mt-1 tracking-wider">Drug-Free Ethos</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Natural Strength & Honor</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Bajarangi Talim */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Why <span className="font-ams font-bold text-sm">बजरंगी तालीम</span></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Built For Athletes Who Refuse The Ordinary
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Most modern gyms are just rows of mirror-lined machines. We offer something deeper: a brotherhood founded on discipline, raw ground power, and scientific progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="card-gradient p-6 rounded-2xl hover:border-orange-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 group-hover:bg-gradient-to-br group-hover:from-orange-600 group-hover:to-amber-600 group-hover:text-white transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{feat.description}</p>
                </div>

                <div className="pt-6 flex items-center space-x-1 text-xs font-bold text-orange-400 group-hover:text-orange-300 transition">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Exercise Library Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Digital Exercise Vault</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Master The Fundamental Movements
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Browse animated form guides, coaching cues, and step-by-step videos curated by master coaches.
            </p>
          </div>

          <button
            onClick={() => setActivePage('exercises')}
            className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase tracking-wider border border-gray-700 flex items-center space-x-2 transition"
          >
            <span>View All Exercises</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWorkouts.map((workout) => (
            <div
              key={workout.id}
              onClick={() => {
                setActivePage('exercises');
                if (onOpenExercise) onOpenExercise(workout.id);
              }}
              className="bg-[#121622] rounded-2xl border border-gray-800 overflow-hidden hover:border-orange-500/50 transition cursor-pointer group shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={workout.img}
                  alt={workout.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/30 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-orange-400 border border-orange-500/40">
                    {workout.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-black text-white text-base group-hover:text-orange-400 transition">
                  {workout.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Target: <strong className="text-gray-200">{workout.muscle}</strong></span>
                  <span className="text-amber-400 font-semibold">{workout.intensity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive BMI Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BMICalculator onSelectPlan={(plan) => {
          setActivePage('pricing');
        }} />
      </section>

      {/* Member Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Voice of Warriors</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Tested & Proven By Champions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="bg-[#121622] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Flame key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed mb-6">
                  "{testi.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-white">{testi.name}</h4>
                  <div className="text-[11px] text-gray-400">{testi.role}</div>
                </div>
                <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                  {testi.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-orange-950/60 via-[#181d28] to-[#10141d] border-2 border-orange-500/40 text-center space-y-6 shadow-2xl box-glow">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/40">
            <Flame className="w-9 h-9 text-white animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            BEGIN YOUR TALIM TRANSFORMATION TODAY
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            Whether you want to build raw physical power, master the ancient Indian Gada, or sculpt a lean, athletic physique with modern iron — Bajarangi Talim is your home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openAuthModal('register')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-600/30 transition transform hover:-translate-y-0.5"
            >
              Enroll In Membership
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="px-8 py-3.5 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-600 text-gray-200 font-bold text-sm uppercase tracking-wider transition"
            >
              Schedule Free Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

