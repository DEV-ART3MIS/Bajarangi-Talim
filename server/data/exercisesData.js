// Comprehensive exercise dataset combining traditional Akhada/Kushti movements and modern gym workouts
const exercises = [
  // 1. Traditional Akhada & Kushti Exercises (Bajarangi Talim Signature)
  {
    id: 'gada-swing',
    name: 'Bajarangi Gada (Mace) Swing',
    category: 'Akhada Heritage',
    muscle: 'Shoulders & Core',
    equipment: 'Gada / Akhada Mace',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/a6n3_mFqN-c',
    animationType: 'gada-swing',
    description: 'The ancient Indian mace swing used by wrestlers (Pehlwan) for centuries to build unmatched grip strength, bulletproof shoulders, and rotational core power.',
    targetMuscles: ['Deltoids', 'Rotator Cuff', 'Forearms/Grip', 'Obliques', 'Traps'],
    instructions: [
      'Stand with feet shoulder-width apart, holding the Gada upright in front of your chest with both hands close together.',
      'Initiate the movement by pendulum-swinging the head of the Gada over one shoulder, letting gravity pull it behind your back.',
      'Keep your elbows tucked and close to your head as the mace traces a circular 360-degree arc behind your neck.',
      'Pull through your lats and opposite shoulder to power the Gada back over the other shoulder to the starting upright position.',
      'Pause for a split second at chest height before initiating the reverse swing.'
    ],
    tips: [
      'Start with a lighter weight (4-6 kg) until circular fluidity and shoulder mobility are established.',
      'Keep your core braced tightly to prevent hyperextending the lower back during the rear arc.',
      'Breathe out forcefully as the mace crests over your shoulder.'
    ],
    recommendedSets: '4 sets of 15-20 swings per side'
  },
  {
    id: 'dand-hindu-pushup',
    name: 'Surya Dand (Hindu Push-Up)',
    category: 'Akhada Heritage',
    muscle: 'Chest & Shoulders',
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/1v0oP9Q2T8w',
    animationType: 'dand',
    description: 'The foundational conditioning exercise of Indian wrestling. It bridges the downward dog to cobra pose with a fluid sweeping dive that strengthens chest, triceps, spine, and shoulders.',
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoid', 'Triceps Brachii', 'Spinal Erectors', 'Hamstrings'],
    instructions: [
      'Begin in an inverted V position (similar to yoga downward-facing dog) with feet wide and hips driven high.',
      'Bend your elbows and swoop your chest downward and forward, skimming millimeters above the ground.',
      'Smoothly press your chest up into a cobra arch, looking slightly upwards towards the ceiling.',
      'Reverse the hip trajectory by pushing your hips straight back up into the high inverted V starting position in one fluid stroke.'
    ],
    tips: [
      'Coordinate breathing: inhale deeply as you dive forward, exhale as you drive hips backward.',
      'Engage your glutes gently at the top of the cobra extension to protect the lumbar spine.'
    ],
    recommendedSets: '3 to 5 sets of 25-50 reps'
  },
  {
    id: 'bethak-hindu-squat',
    name: 'Pehlwan Bethak (Hindu Squat)',
    category: 'Akhada Heritage',
    muscle: 'Legs',
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/8o3R3mDqf4E',
    animationType: 'bethak',
    description: 'Rhythmic, deep squats performed on the balls of the feet with synchronized arm swings, used by legendary wrestlers like The Great Gama for endless knee stamina and quad endurance.',
    targetMuscles: ['Quadriceps', 'Calves', 'Glutes', 'Ankles & Tendons'],
    instructions: [
      'Stand upright with feet shoulder-width apart, arms resting by your sides.',
      'As you lower down, raise your heels off the floor and swing your arms backwards behind your torso.',
      'Squat down until your thighs press against your calves, balancing on the balls of your feet.',
      'Explode upward, rolling weight back toward the midfoot while sweeping your arms forward and up in a circular motion.'
    ],
    tips: [
      'Maintain an upright torso throughout the descent.',
      'Focus on smooth tempo and continuous rhythmic cadence rather than pausing at the top.'
    ],
    recommendedSets: '4 sets of 30-50 reps'
  },
  {
    id: 'samtola-indian-barbell',
    name: 'Samtola Clean & Overhead Press',
    category: 'Akhada Heritage',
    muscle: 'Full Body',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/U2hy2pC8QeI',
    animationType: 'clean-press',
    description: 'Traditional weighted log or barbell lift from the mud pit. It trains explosive triple extension, brute upper back stabilization, and strict overhead power.',
    targetMuscles: ['Shoulders', 'Upper Back', 'Hamstrings', 'Glutes', 'Triceps'],
    instructions: [
      'Position feet under the bar with a firm overhand grip slightly outside shoulder width.',
      'Hinge at hips, brace core, and explosively pull the bar upward in one continuous momentum, catching it across your front deltoids.',
      'Stabilize your stance, tuck your chin slightly, and drive the bar vertically locked out over your crown.',
      'Lower the weight back to shoulders with control, then return to mid-thigh/ground.'
    ],
    tips: [
      'Keep the bar path close to your body during the pull.',
      'Do not arch your lower spine during the overhead press lock-out.'
    ],
    recommendedSets: '5 sets of 5 reps'
  },

  // 2. Modern Chest Workouts
  {
    id: 'barbell-bench-press',
    name: 'Flat Barbell Bench Press',
    category: 'Strength & Hypertrophy',
    muscle: 'Chest',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/rT7DgCr-3pg',
    animationType: 'bench-press',
    description: 'The premier compound push exercise for building dense pectoral mass, front deltoid strength, and tricep pressing power.',
    targetMuscles: ['Pectoralis Major (Mid/Lower)', 'Anterior Deltoid', 'Triceps Brachii'],
    instructions: [
      'Lie flat on the bench with eyes directly under the racked bar. Plant your feet firmly on the ground.',
      'Grip the knurling slightly wider than shoulder-width, retract your scapula (squeeze shoulder blades together) and unrack.',
      'Inhale and lower the bar in a controlled path to your mid-sternum, keeping elbows at approximately a 45-degree angle.',
      'Press the bar explosively back up along a gentle J-curve to lockout over your upper chest while exhaling.'
    ],
    tips: [
      'Maintain continuous leg drive by driving your feet into the floor.',
      'Never bounce the bar off your ribcage.'
    ],
    recommendedSets: '4 sets of 6-10 reps'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Strength & Hypertrophy',
    muscle: 'Chest',
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/8iPEnn-ltC8',
    animationType: 'incline-press',
    description: 'Focuses primarily on the clavicular head (upper chest) and shoulder stability with independent arm freedom.',
    targetMuscles: ['Upper Pectorals', 'Front Deltoids', 'Triceps'],
    instructions: [
      'Set an adjustable bench to a 30 to 45 degree angle. Sit with dumbbells resting on your knees.',
      'Kick the dumbbells up one by one as you lie back into position with palms facing forward.',
      'Lower the dumbbells steadily until your chest feels a deep, comfortable stretch.',
      'Drive the dumbbells upward, converging slightly at the top without banging them together.'
    ],
    tips: [
      'Avoid setting the bench too steep (above 45 degrees shifts focus mostly to shoulders).',
      'Keep wrists stacked vertically over elbows throughout the press.'
    ],
    recommendedSets: '3 to 4 sets of 8-12 reps'
  },
  {
    id: 'cable-chest-crossover',
    name: 'Standing Cable Flyes',
    category: 'Strength & Hypertrophy',
    muscle: 'Chest',
    equipment: 'Cable',
    difficulty: 'Beginner',
    gifUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/taI4XduLpTw',
    animationType: 'cable-fly',
    description: 'Provides constant tension throughout the range of motion for peak adduction and chest striation development.',
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoids'],
    instructions: [
      'Set pulleys to chest height. Grip handles and take one pace forward in a staggered stance.',
      'Lean slightly forward from your torso, with a gentle bend in your elbows.',
      'Bring handles together in a hugging motion across the front of your chest until hands touch or cross.',
      'Slowly open your arms back to the starting stretch under steady resistance.'
    ],
    tips: [
      'Maintain a rigid elbow angle; avoid turning it into a press.',
      'Squeeze your pecs hard for a full second at the peak contraction point.'
    ],
    recommendedSets: '3 sets of 12-15 reps'
  },

  // 3. Modern Back Workouts
  {
    id: 'deadlift-conventional',
    name: 'Barbell Conventional Deadlift',
    category: 'Strength & Hypertrophy',
    muscle: 'Back & Posterior Chain',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    gifUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/op9kVnSso6Q',
    animationType: 'deadlift',
    description: 'The king of posterior chain exercises. Builds unshakeable back thickness, grip, hip hinges, and raw pulling strength.',
    targetMuscles: ['Erector Spinae', 'Latissimus Dorsi', 'Glutes', 'Hamstrings', 'Trapezius'],
    instructions: [
      'Stand with feet hip-width apart, barbell cutting across your midfoot. Shins about 1 inch from the bar.',
      'Hinge hips back and grip the bar just outside your knees with an overhand or mixed grip.',
      'Bring shins to touch the bar, pull chest tall, brace core, and squeeze lats to pull the slack out of the barbell.',
      'Drive the floor away with your legs, keeping the bar sliding directly against your shins and thighs up to full lockout.'
    ],
    tips: [
      'Never round your lower back under heavy loads.',
      'Think of pushing the earth away with your heels rather than pulling with your arms.'
    ],
    recommendedSets: '4 sets of 5 reps'
  },
  {
    id: 'wide-grip-pullups',
    name: 'Wide-Grip Tactical Pull-Ups',
    category: 'Calisthenics',
    muscle: 'Back',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/eGo4IYlbE5g',
    animationType: 'pullup',
    description: 'The gold standard upper-body vertical pulling exercise for broad V-taper lats, biceps, and shoulder health.',
    targetMuscles: ['Latissimus Dorsi', 'Teres Major', 'Biceps', 'Rhomboids'],
    instructions: [
      'Grasp the pull-up bar with an overhand grip roughly 1.5 times shoulder-width.',
      'Hang with arms fully extended into a dead hang, engage your shoulder blades downward.',
      'Pull your chest up toward the bar by driving your elbows down toward your hips.',
      'Clear your chin over the bar, pause briefly, then lower with full control to dead hang.'
    ],
    tips: [
      'Avoid swinging or using kipping momentum unless explicitly training gymnastics.',
      'Focus on leading with your sternum toward the bar.'
    ],
    recommendedSets: '4 sets to near failure or 8-12 reps'
  },
  {
    id: 'bent-over-barbell-row',
    name: 'Pendlay / Bent-Over Barbell Row',
    category: 'Strength & Hypertrophy',
    muscle: 'Back',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/FWJR5Ve8gkQ',
    animationType: 'barbell-row',
    description: 'Essential for mid-back thickness, rhomboids, rear delts, and reinforcing spinal isometric strength.',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Trapezius (Mid/Lower)', 'Rear Delts'],
    instructions: [
      'Stand over the barbell, hinge forward at hips until your torso is approximately 45 degrees to the floor.',
      'Hold bar with an overhand grip slightly wider than shoulder-width.',
      'Pull the bar upward smoothly into your lower ribs/navel by driving elbows behind your back.',
      'Squeeze shoulder blades together at top, then lower under control.'
    ],
    tips: [
      'Keep knees softly bent and head aligned with your neutral spine.',
      'Do not jerk the torso up and down to create false momentum.'
    ],
    recommendedSets: '4 sets of 8-10 reps'
  },

  // 4. Modern Legs & Lower Body Workouts
  {
    id: 'barbell-back-squat',
    name: 'Olympic Barbell Back Squat',
    category: 'Strength & Hypertrophy',
    muscle: 'Legs',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/bEv6CCg2BC8',
    animationType: 'squat',
    description: 'The premier lower body compound movement for developing quad sweep, glute activation, and systemic metabolic stress.',
    targetMuscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstrings', 'Adductors', 'Core'],
    instructions: [
      'Rest the barbell firmly across your upper traps (high bar) or rear delts (low bar).',
      'Step back, place feet just outside shoulder width with toes angled slightly outward.',
      'Take a deep belly breath into your diaphragm, brace your abdominal wall tightly.',
      'Descend by bending knees and hips simultaneously until your hip crease breaks below parallel.',
      'Drive powerfully out of the hole, pushing through your whole foot to full standing lockout.'
    ],
    tips: [
      'Keep knees tracking inline with toes throughout the repetition.',
      'Maintain an upright chest and proud collarbone.'
    ],
    recommendedSets: '4 sets of 6-8 reps'
  },
  {
    id: 'romanian-deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    category: 'Strength & Hypertrophy',
    muscle: 'Legs & Hamstrings',
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/JCXUYuzwNrM',
    animationType: 'rdl',
    description: 'Exceptional movement for hamstring hypertrophy, glute development, and teaching proper hip hinge mechanics.',
    targetMuscles: ['Hamstrings', 'Gluteus Maximus', 'Lower Back', 'Forearms'],
    instructions: [
      'Hold a pair of dumbbells against the front of your thighs, standing tall with feet hip-width apart.',
      'With soft knees, push your hips directly backward as if touching a wall behind you.',
      'Lower the dumbbells tracing closely down your shins until you feel a deep stretch in hamstrings.',
      'Drive hips forward and contract glutes hard to return to standing.'
    ],
    tips: [
      'Do not bend knees into a squat; this is a pure horizontal hip hinge.',
      'Keep shoulders pulled back to prevent spine flexion.'
    ],
    recommendedSets: '3 to 4 sets of 10-12 reps'
  },

  // 5. Shoulders & Arms Workouts
  {
    id: 'overhead-military-press',
    name: 'Standing Overhead Military Press',
    category: 'Strength & Hypertrophy',
    muscle: 'Shoulders',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2yjwXTZQDDI',
    animationType: 'ohp',
    description: 'Pure vertical pressing power. Demands strong core bracing, glute squeeze, and delivers massive boulder shoulders.',
    targetMuscles: ['Anterior & Lateral Deltoids', 'Triceps', 'Upper Trapezius', 'Core'],
    instructions: [
      'Rack bar at collarbone height. Grip bar just outside shoulder width with forearms vertical.',
      'Unrack, step back, squeeze glutes and brace your abs rock solid.',
      'Press the bar straight up, pulling head slightly back to let the bar pass, then push head through window at top.',
      'Lock out overhead with arms straight above ears, then lower under control to clavicle.'
    ],
    tips: [
      'Do not hyperextend lower back to cheat the weight.',
      'Keep wrists straight and solid over the forearms.'
    ],
    recommendedSets: '4 sets of 6-8 reps'
  },
  {
    id: 'ez-bar-bicep-curl',
    name: 'EZ-Bar Standing Bicep Curl',
    category: 'Strength & Hypertrophy',
    muscle: 'Arms',
    equipment: 'Barbell',
    difficulty: 'Beginner',
    gifUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/kwG2ipFRgfo',
    animationType: 'bicep-curl',
    description: 'The ergonomic camber of the EZ-bar protects wrists while allowing maximum bicep overload and peak contraction.',
    targetMuscles: ['Biceps Brachii (Short & Long Head)', 'Brachialis', 'Brachioradialis'],
    instructions: [
      'Grip the inner cambered knurls with palms supinated. Stand tall with elbows pinned to ribs.',
      'Without swinging torso, curl the bar upward towards shoulders contracting biceps intensely.',
      'Squeeze biceps at the crest for 1 second.',
      'Lower bar steadily back down over a 3-second negative eccentric phase.'
    ],
    tips: [
      'Keep upper arms stationary; do not allow elbows to drift forward excessively.',
      'Control the lowering phase completely.'
    ],
    recommendedSets: '3 sets of 10-12 reps'
  },
  {
    id: 'parallel-bar-dips',
    name: 'Bodyweight Chest & Tricep Dips',
    category: 'Calisthenics',
    muscle: 'Arms & Chest',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2z8JmcrW-As',
    animationType: 'dips',
    description: 'The upper body squat. Outstanding compound bodyweight movement for thick lower pecs and horseshoe triceps.',
    targetMuscles: ['Triceps Brachii', 'Lower Pectorals', 'Front Deltoids'],
    instructions: [
      'Mount the parallel dip bars with arms fully locked and feet suspended.',
      'Incline torso slightly forward for chest emphasis (or upright for tricep emphasis).',
      'Lower your body by bending elbows until upper arms are at least parallel to the floor (90 degrees).',
      'Push forcefully through your palms to return to full elbow extension.'
    ],
    tips: [
      'Avoid going excessively deep if you experience shoulder discomfort.',
      'Keep elbows from flaring excessively outward.'
    ],
    recommendedSets: '3 to 4 sets of 8-15 reps'
  },

  // 6. Core & Conditioning
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Straight Leg Raise',
    category: 'Calisthenics',
    muscle: 'Core',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/Pr1ieGZ5atk',
    animationType: 'leg-raise',
    description: 'Develops supreme abdominal compression, hip flexor strength, and pelvic control without compressing the lumbar spine.',
    targetMuscles: ['Rectus Abdominis (Lower)', 'Hip Flexors', 'Obliques', 'Forearms'],
    instructions: [
      'Hang from a pull-up bar with overhand grip and legs straight.',
      'Engage lats to stabilize body swing, tilt pelvis backward.',
      'Raise straight legs upward smoothly until toes reach parallel to floor or touch the bar.',
      'Control the descent smoothly without allowing momentum to swing your body.'
    ],
    tips: [
      'Begin with knee tucks if straight legs produce hamstring limitation.',
      'Exhale completely as you curl hips upward.'
    ],
    recommendedSets: '3 sets of 12-15 reps'
  },
  {
    id: 'battle-ropes-slams',
    name: 'High-Intensity Battle Rope Slams',
    category: 'Functional & Agility',
    muscle: 'Full Body',
    equipment: 'Battle Ropes',
    difficulty: 'Beginner',
    gifUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/c0e8s3YdI9k',
    animationType: 'rope-slam',
    description: 'High-octane conditioning drill that torches body fat, increases VO2 max, and tests mental fortitude.',
    targetMuscles: ['Shoulders', 'Lats', 'Core', 'Glutes', 'Cardiovascular System'],
    instructions: [
      'Stand in athletic quarter-squat stance, grasping one rope in each hand with neutral grip.',
      'Raise both arms overhead simultaneously while extending hips and knees.',
      'Violently slam ropes down toward the floor, flexing at hips and knees as you crash the wave down.',
      'Immediately rebound back up into the next slam in rapid continuous succession.'
    ],
    tips: [
      'Generate force from full body triple extension, not just isolated arms.',
      'Keep breathing steady and rhythmic throughout the interval.'
    ],
    recommendedSets: '5 rounds of 30s work / 30s rest'
  }
];

const categories = [
  'All',
  'Akhada Heritage',
  'Strength & Hypertrophy',
  'Calisthenics',
  'Functional & Agility'
];

const muscles = [
  'All',
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Core',
  'Full Body'
];

module.exports = { exercises, categories, muscles };

