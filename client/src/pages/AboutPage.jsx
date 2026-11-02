import React from 'react';
import { Flame, Shield, Award, CheckCircle2, History, Target, Users, MapPin } from 'lucide-react';

const AboutPage = ({ setActivePage }) => {
  const milestones = [
    {
      year: '1982',
      title: 'The Mud Pit Foundations',
      description: 'Founded by Master Wrestler Baliram Kotkar in Ghulewadi, Tal-Sangamner (near Amrutvahini College), Maharashtra as an authentic rural Akhada consecrated to Bajrang Bali, instilling raw strength, traditional wrestling, and moral character in youth.',
    },
    {
      year: '1998',
      title: 'The Iron Revolution',
      description: 'Introduced heavy cast iron barbells, custom squat stands, and dumbbell rows alongside traditional Gadas, pioneering the hybrid training methodology in Maharashtra.',
    },
    {
      year: '2014',
      title: 'Modern Sports Science',
      description: 'Expanded into a state-of-the-art training arena featuring Olympic weightlifting platforms, calisthenics rigs, and accredited strength & conditioning coaching led by Nikhil Kotkar and Shyam Kotkar.',
    },
    {
      year: '2026',
      title: 'Digital Bajarangi Platform',
      description: 'Launched our digital exercise library, turnstile member management, and personalized biometric coaching, connecting thousands of warriors across India.',
    },
  ];

  const facilities = [
    {
      title: 'Sacred Red Clay Akhada Pit',
      desc: 'Formulated with authentic fertile red soil infused with turmeric, neem oil, camphor, and buttermilk for natural antiseptic healing and authentic Pehlwan wrestling.',
      tag: 'Heritage',
      img: '/akhada/akhada-pit.jpg',
    },
    {
      title: 'Olympic Free Weight & Power Arena',
      desc: 'Competition-spec barbells, bumper plates, 6 power racks, and deadlift platforms engineered for serious powerlifters and athletes.',
      tag: 'Strength',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Calisthenics & Functional Rig',
      desc: 'Monkey bars, gymnastic rings, peg boards, and vertical ropes designed for mastering bodyweight relative strength and mobility.',
      tag: 'Agility',
      img: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Bio-Recovery & Hydrotherapy Lounge',
      desc: 'Cedarwood steam saunas, contrast ice plunges, and targeted percussion therapy to accelerate muscle regeneration between grueling sessions.',
      tag: 'Recovery',
      img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex justify-center mb-2">
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-xl shadow-orange-500/20 group-hover:scale-105 transition-all bg-black">
              <img
                src="/logo.png"
                alt="Hanuman Gym Emblem"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-orange-500/20 blur-md -z-10"></div>
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest">
          <History className="w-3.5 h-3.5" />
          <span>Our Legacy Since 1982</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Where Ancient Akhada Spirit Meets Modern Science
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Bajarangi Talim was forged on a single unshakeable premise: true strength is not merely superficial muscle; it is an alliance of physical fortitude, unbreakable discipline, and humility.
        </p>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-orange-400">
            <Flame className="w-4 h-4 fill-orange-400" />
            <span>The Bajarangi Code</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase leading-tight">
            The Philosophy of Hanuman: Strength Rooted in Discipline
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            In Indian culture, Bajrang Bali symbolizes boundless physical power coupled with total self-mastery. For over four decades, our masters have preserved the sacred training methods of the Pehlwans — the swinging of the heavy Gada (mace) for bulletproof shoulders, the relentless cadence of Surya Dand (Hindu push-ups), and the stamina of Pehlwan Bethaks (squats).
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            As fitness evolved, we embraced modern biomechanics, progressive barbell loading, and evidence-based nutrition. Today, Bajarangi Talim stands as one of the country's most respected hybrid athletic institutes — where a national powerlifter trains side-by-side with an akhada wrestler and a corporate professional.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-[#121622] p-4 rounded-xl border border-gray-800">
              <div className="text-orange-400 font-bold text-sm mb-1">Anushasan (Discipline)</div>
              <p className="text-xs text-gray-400">Consistent daily effort triumphs over sporadic motivation.</p>
            </div>
            <div className="bg-[#121622] p-4 rounded-xl border border-gray-800">
              <div className="text-amber-400 font-bold text-sm mb-1">Shuddh (Purity)</div>
              <p className="text-xs text-gray-400">100% natural, drug-free conditioning and clean nourishment.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/30 shadow-2xl">
            <img
              src="/akhada/akhada-pehlwan.jpg"
              alt="Bajarangi Talim Authentic Red Soil Akhada Grounds"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-gray-700 text-xs text-gray-200">
              <div className="font-bold text-white text-sm">Bajarangi Akhada Arena, Ghulewadi</div>
              <div>Dedicated Traditional Mud Wrestling & Strength Complex (Near Amrutvahini College)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Milestones */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Four Decades of Evolution</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">A timeline of resilience, innovation, and champions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-[#121622] p-6 rounded-2xl border border-gray-800 relative">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 mb-2">
                {m.year}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{m.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities Showcase */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Our Training Grounds</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Meticulously maintained zones built for raw output</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bg-[#121622] rounded-2xl border border-gray-800 overflow-hidden flex flex-col sm:flex-row group">
              <div className="sm:w-1/2 relative aspect-video sm:aspect-auto">
                <img
                  src={fac.img}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-orange-400 border border-orange-500/30">
                  {fac.tag}
                </span>
              </div>
              <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{fac.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{fac.desc}</p>
                </div>
                <div className="pt-4 flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Available to All Members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="text-xl font-black text-white uppercase">Experience The Spirit in Person</h3>
          <p className="text-xs text-gray-400 mt-1">Book a free tour or drop by our Ghulewadi, Sangamner headquarters anytime.</p>
        </div>
        <button
          onClick={() => setActivePage('contact')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition"
        >
          Schedule Visit
        </button>
      </div>
    </div>
  );
};

export default AboutPage;

