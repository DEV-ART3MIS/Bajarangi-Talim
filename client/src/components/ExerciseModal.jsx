import React, { useState } from 'react';
import { X, Flame, Dumbbell, Award, AlertTriangle, CheckCircle2, Play, Video } from 'lucide-react';

const ExerciseModal = ({ exercise, onClose }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#121622] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800 bg-[#0d1017]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-bold tracking-wider text-orange-400">
                  {exercise.category}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                  {exercise.difficulty}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{exercise.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Visual Showcase (GIF/Image or Video Embed) */}
          <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-gray-950 aspect-video flex items-center justify-center shadow-inner">
            {showVideo && exercise.videoEmbedUrl ? (
              <iframe
                src={`${exercise.videoEmbedUrl}?autoplay=1`}
                title={exercise.name}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="relative w-full h-full group">
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
                
                {/* Form Animation Indicator */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold text-gray-200">Form Demonstration Active</span>
                  </div>

                  {exercise.videoEmbedUrl && (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition"
                    >
                      <Video className="w-4 h-4" />
                      <span>Watch Breakdown Video</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Primary Muscle</span>
              <span className="text-sm font-black text-orange-400 mt-0.5 block">{exercise.muscle}</span>
            </div>
            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Equipment</span>
              <span className="text-sm font-black text-gray-200 mt-0.5 block">{exercise.equipment}</span>
            </div>
            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Intensity</span>
              <span className="text-sm font-black text-amber-400 mt-0.5 block">{exercise.difficulty}</span>
            </div>
            <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Recommended Volume</span>
              <span className="text-xs font-black text-emerald-400 mt-0.5 block">{exercise.recommendedSets || '3-4 Sets'}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed bg-gray-900/50 p-4 rounded-xl border border-gray-800">
            {exercise.description}
          </p>

          {/* Target Muscles Badges */}
          {exercise.targetMuscles && (
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Targeted Muscle Anatomy</h4>
              <div className="flex flex-wrap gap-2">
                {exercise.targetMuscles.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step by step Instructions */}
          <div>
            <h4 className="text-sm uppercase font-bold tracking-wider text-white mb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500" />
              <span>Step-by-Step Form & Execution</span>
            </h4>
            <div className="space-y-2.5">
              {exercise.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-gray-900/40 p-3 rounded-xl border border-gray-800/80">
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-orange-500/30">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coach Form Tips & Mistakes */}
          {exercise.tips && (
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-2 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Pehlwan Coach Form Cues & Common Mistakes</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-200/90 list-disc list-inside">
                {exercise.tips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#0d1017] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase tracking-wider transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;

