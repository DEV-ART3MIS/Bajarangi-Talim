import React, { useState, useEffect } from 'react';
import { Search, Dumbbell, Flame, Filter, Play, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { api } from '../services/api';
import ExerciseModal from '../components/ExerciseModal';

const ExercisesPage = ({ initialExerciseId }) => {
  const [exercises, setExercises] = useState([]);
  const [categories, setCategories] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Selected exercise for modal
  const [activeExercise, setActiveExercise] = useState(null);

  useEffect(() => {
    fetchExercises();
  }, [search, selectedCategory, selectedMuscle, selectedDifficulty]);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const res = await api.getExercises({
        q: search,
        category: selectedCategory,
        muscle: selectedMuscle,
        difficulty: selectedDifficulty,
      });

      if (res.success) {
        setExercises(res.exercises);
        if (res.categories && categories.length === 0) setCategories(res.categories);
        if (res.muscles && muscles.length === 0) setMuscles(res.muscles);

        // If an initialExerciseId was requested, open it
        if (initialExerciseId && !activeExercise) {
          const found = res.exercises.find((ex) => ex.id === initialExerciseId);
          if (found) setActiveExercise(found);
        }
      }
    } catch (err) {
      console.error('Error fetching exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedMuscle('All');
    setSelectedDifficulty('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-widest">
          <Activity className="w-3.5 h-3.5" />
          <span>Interactive Movement Vault</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Bajarangi Exercise & Form Library
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Master correct biomechanics, avoid chronic injury, and unlock full muscular recruitment with step-by-step video breakdowns and authentic Akhada movements.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121622] p-6 rounded-3xl border border-gray-800 space-y-6 shadow-xl">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search exercises by name, muscle, equipment (e.g. Gada, Dand, Deadlift, Chest)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/80 border border-gray-700/80 rounded-2xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-3.5 text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">
            Discipline / Category
          </span>
          <div className="flex flex-wrap gap-2">
            {(categories.length > 0 ? categories : ['All', 'Akhada Heritage', 'Strength & Hypertrophy', 'Calisthenics', 'Functional & Agility']).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Muscles and Difficulty Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-800/60">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">
              Target Muscle Group
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(muscles.length > 0 ? muscles : ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body']).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMuscle(m)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    selectedMuscle === m
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold'
                      : 'bg-gray-900/60 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">
              Experience Level
            </span>
            <div className="flex space-x-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedDifficulty(lvl)}
                  className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium text-center transition ${
                    selectedDifficulty === lvl
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold'
                      : 'bg-gray-900/60 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          Showing <strong className="text-white font-bold">{exercises.length}</strong> movements
        </span>
        {(search || selectedCategory !== 'All' || selectedMuscle !== 'All' || selectedDifficulty !== 'All') && (
          <button
            onClick={handleClearFilters}
            className="text-orange-400 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Exercises Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm">Loading movement archive...</p>
        </div>
      ) : exercises.length === 0 ? (
        <div className="py-20 text-center bg-[#121622] rounded-3xl border border-gray-800 p-8">
          <Dumbbell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No matching exercises found</h3>
          <p className="text-xs text-gray-400 mb-4">Try searching for a different muscle, category, or clear filters.</p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => setActiveExercise(exercise)}
              className="bg-[#121622] rounded-2xl border border-gray-800 overflow-hidden hover:border-orange-500/50 transition cursor-pointer group flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Media Preview Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-950">
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-orange-400 border border-orange-500/40">
                      {exercise.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-900/90 text-gray-300">
                      {exercise.difficulty}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition">
                      {exercise.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                      {exercise.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-800/80">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">Target</span>
                      <span className="text-gray-300 font-semibold">{exercise.muscle}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">Equipment</span>
                      <span className="text-gray-300 font-semibold">{exercise.equipment}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom trigger */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  className="w-full py-2.5 px-3 rounded-xl bg-gray-900 group-hover:bg-orange-600 group-hover:text-white text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition"
                >
                  <span>View Form & Cues</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exercise Modal */}
      {activeExercise && (
        <ExerciseModal
          exercise={activeExercise}
          onClose={() => setActiveExercise(null)}
        />
      )}
    </div>
  );
};

export default ExercisesPage;

