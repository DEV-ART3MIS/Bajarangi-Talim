import React, { useState, useMemo } from 'react';
import { Activity, Flame, Droplet, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BMICalculator = ({ onSelectPlan }) => {
  const { openAuthModal, user } = useAuth();
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [activity, setActivity] = useState('moderate'); // 'light', 'moderate', 'intense'

  // Metric states
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(74);

  // Imperial states
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weightLbs, setWeightLbs] = useState(163);

  // Effective height and weight in metric
  const effectiveHeightM = useMemo(() => {
    if (unit === 'metric') {
      return heightCm / 100;
    } else {
      const totalInches = (Number(heightFeet) * 12) + Number(heightInches);
      return totalInches * 0.0254;
    }
  }, [unit, heightCm, heightFeet, heightInches]);

  const effectiveWeightKg = useMemo(() => {
    if (unit === 'metric') {
      return Number(weightKg);
    } else {
      return Number(weightLbs) * 0.453592;
    }
  }, [unit, weightKg, weightLbs]);

  // Compute BMI
  const bmi = useMemo(() => {
    if (effectiveHeightM <= 0) return 0;
    const val = effectiveWeightKg / (effectiveHeightM * effectiveHeightM);
    return Math.round(val * 10) / 10;
  }, [effectiveWeightKg, effectiveHeightM]);

  // Status & Recommendations
  const bmiDetails = useMemo(() => {
    if (bmi < 18.5) {
      return {
        status: 'Underweight',
        color: 'text-blue-400',
        barColor: 'bg-blue-500',
        bgColor: 'bg-blue-500/10 border-blue-500/30',
        message: 'You are below the standard weight range. Focus on progressive strength training and a caloric surplus rich in proteins.',
        recommendedPlan: 'Warrior Pro',
        calorieMultiplier: 1.25,
        waterMultiplier: 38,
      };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return {
        status: 'Optimal / Normal Weight',
        color: 'text-emerald-400',
        barColor: 'bg-emerald-500',
        bgColor: 'bg-emerald-500/10 border-emerald-500/30',
        message: 'Outstanding! You have a healthy body composition. Elevate your athletic performance and muscular endurance with Akhada conditioning.',
        recommendedPlan: 'Warrior Pro',
        calorieMultiplier: 1.1,
        waterMultiplier: 40,
      };
    } else if (bmi >= 25 && bmi <= 29.9) {
      return {
        status: 'Overweight',
        color: 'text-amber-400',
        barColor: 'bg-amber-500',
        bgColor: 'bg-amber-500/10 border-amber-500/30',
        message: 'Slightly above the normal band. Our high-octane Akhada conditioning, battle ropes, and strength workouts will burn fat while preserving muscle.',
        recommendedPlan: 'Warrior Pro',
        calorieMultiplier: 0.88,
        waterMultiplier: 42,
      };
    } else {
      return {
        status: 'Obese / Heavy Band',
        color: 'text-red-400',
        barColor: 'bg-red-500',
        bgColor: 'bg-red-500/10 border-red-500/30',
        message: 'Higher body fat detected. A dedicated structured routine with professional nutrition guidance is strongly recommended.',
        recommendedPlan: 'Bajarangi Elite',
        calorieMultiplier: 0.8,
        waterMultiplier: 45,
      };
    }
  }, [bmi]);

  // Healthy Weight Range
  const healthyWeightMin = Math.round(18.5 * effectiveHeightM * effectiveHeightM * 10) / 10;
  const healthyWeightMax = Math.round(24.9 * effectiveHeightM * effectiveHeightM * 10) / 10;

  // Hydration & Daily Energy Needs
  const dailyWaterLiters = Math.round((effectiveWeightKg * bmiDetails.waterMultiplier / 1000) * 10) / 10;
  const bmr = gender === 'male' 
    ? 10 * effectiveWeightKg + 6.25 * (effectiveHeightM * 100) - 5 * age + 5
    : 10 * effectiveWeightKg + 6.25 * (effectiveHeightM * 100) - 5 * age - 161;
  const activityFactor = activity === 'light' ? 1.375 : activity === 'moderate' ? 1.55 : 1.725;
  const targetCalories = Math.round(bmr * activityFactor * bmiDetails.calorieMultiplier);

  // Position percentage for gauge (15 to 35 range mapped to 0% to 100%)
  const gaugePercent = Math.min(Math.max(((bmi - 15) / (35 - 15)) * 100, 0), 100);

  const handleEnrollClick = () => {
    if (onSelectPlan) {
      onSelectPlan(bmiDetails.recommendedPlan);
    } else {
      openAuthModal('register', bmiDetails.recommendedPlan);
    }
  };

  return (
    <div className="bg-[#121622] rounded-2xl border border-gray-800 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Health Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Bajarangi BMI & Metabolic Calculator
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Calculate your Body Mass Index, target hydration, and receive a customized training blueprint.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center bg-gray-900/90 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setUnit('metric')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              unit === 'metric'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              unit === 'imperial'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Imperial (ft / lbs)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Inputs Section */}
        <div className="lg:col-span-6 space-y-6">
          {/* Gender & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Biological Gender
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-3 rounded-xl border text-sm font-semibold transition ${
                    gender === 'male'
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-3 rounded-xl border text-sm font-semibold transition ${
                    gender === 'female'
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Age: <span className="text-white font-bold">{age} yrs</span>
              </label>
              <input
                type="range"
                min="14"
                max="80"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Height Input */}
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800/80">
            {unit === 'metric' ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Height</span>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(100, Math.min(230, Number(e.target.value))))}
                      className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-right font-bold text-white text-sm"
                    />
                    <span className="text-gray-400 text-xs font-semibold">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>120 cm</span>
                  <span>170 cm</span>
                  <span>220 cm</span>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Height</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Feet</label>
                    <input
                      type="number"
                      min="4"
                      max="7"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Inches</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white font-bold text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Weight Input */}
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800/80">
            {unit === 'metric' ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Weight</span>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Math.max(30, Math.min(200, Number(e.target.value))))}
                      className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-right font-bold text-white text-sm"
                    />
                    <span className="text-gray-400 text-xs font-semibold">kg</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="35"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>35 kg</span>
                  <span>95 kg</span>
                  <span>160 kg</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Weight</span>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Math.max(70, Math.min(450, Number(e.target.value))))}
                      className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-right font-bold text-white text-sm"
                    />
                    <span className="text-gray-400 text-xs font-semibold">lbs</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="77"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Daily Training / Activity Routine
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActivity('light')}
                className={`py-2 px-2 rounded-xl border text-xs font-semibold transition ${
                  activity === 'light'
                    ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                Sedentary / Light
              </button>
              <button
                type="button"
                onClick={() => setActivity('moderate')}
                className={`py-2 px-2 rounded-xl border text-xs font-semibold transition ${
                  activity === 'moderate'
                    ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                Gym (3-4x / wk)
              </button>
              <button
                type="button"
                onClick={() => setActivity('intense')}
                className={`py-2 px-2 rounded-xl border text-xs font-semibold transition ${
                  activity === 'intense'
                    ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                Pehlwan / Athlete
              </button>
            </div>
          </div>
        </div>

        {/* Right Output & Recommendation Section */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Main BMI Score Display */}
          <div className="bg-gray-900/90 rounded-2xl p-6 border border-gray-800 shadow-inner">
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Your Calculated BMI</span>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="text-5xl font-black text-white tracking-tight">{bmi}</span>
                  <span className="text-xs font-bold text-gray-400">kg/m²</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${bmiDetails.bgColor} ${bmiDetails.color}`}>
                  {bmiDetails.status}
                </span>
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="relative h-3 w-full rounded-full bg-gray-800 overflow-hidden flex">
                <div className="w-[17.5%] bg-blue-500 h-full" title="Underweight (&lt;18.5)"></div>
                <div className="w-[32%] bg-emerald-500 h-full" title="Normal (18.5-24.9)"></div>
                <div className="w-[25%] bg-amber-500 h-full" title="Overweight (25-29.9)"></div>
                <div className="w-[25.5%] bg-red-500 h-full" title="Obese (30+)"></div>
              </div>

              {/* Gauge needle pointer */}
              <div className="relative w-full h-3">
                <div
                  className="absolute -top-1 -translate-x-1/2 transition-all duration-300 flex flex-col items-center"
                  style={{ left: `${gaugePercent}%` }}
                >
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-white"></div>
                  <span className="text-[9px] font-black text-white bg-black/80 px-1 rounded mt-0.5">YOU</span>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-gray-500 pt-1 font-semibold">
                <span className="text-blue-400">&lt;18.5 Under</span>
                <span className="text-emerald-400">18.5-24.9 Normal</span>
                <span className="text-amber-400">25-29.9 Over</span>
                <span className="text-red-400">30+ Obese</span>
              </div>
            </div>

            {/* Assessment message */}
            <p className="text-xs text-gray-300 mt-5 leading-relaxed bg-black/40 p-3 rounded-lg border border-gray-800">
              {bmiDetails.message}
            </p>
          </div>

          {/* Metabolic & Hydration Insights */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800 text-center">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-1.5">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Est. Calories</div>
              <div className="text-base font-black text-white mt-0.5">{targetCalories}</div>
              <div className="text-[9px] text-gray-500">kcal / day</div>
            </div>

            <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800 text-center">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-1.5">
                <Droplet className="w-4 h-4" />
              </div>
              <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Hydration</div>
              <div className="text-base font-black text-white mt-0.5">{dailyWaterLiters} L</div>
              <div className="text-[9px] text-gray-500">water target</div>
            </div>

            <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800 text-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-1.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Ideal Range</div>
              <div className="text-base font-black text-white mt-0.5">{healthyWeightMin}-{healthyWeightMax}</div>
              <div className="text-[9px] text-gray-500">kg target</div>
            </div>
          </div>

          {/* Recommended Gym Plan Banner with Direct CTA */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-orange-950/40 via-amber-950/20 to-gray-900 border border-orange-500/40 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 fill-orange-400 inline" />
                <span>Recommended Membership for You</span>
              </span>
              <div className="text-base font-black text-white">{bmiDetails.recommendedPlan}</div>
              <div className="text-xs text-gray-400">Optimized for your composition & fitness goals</div>
            </div>

            <button
              onClick={handleEnrollClick}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center space-x-1.5 shrink-0 transition"
            >
              <span>{user ? 'Upgrade to Plan' : 'Claim Plan'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;

