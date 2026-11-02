const { exercises, categories, muscles } = require('../data/exercisesData');

// @desc    Get all exercises with search, category, muscle, and difficulty filters
// @route   GET /api/exercises
exports.getExercises = (req, res) => {
  try {
    let result = [...exercises];
    const { q, category, muscle, difficulty } = req.query;

    if (q) {
      const query = q.toLowerCase().trim();
      result = result.filter(
        (ex) =>
          ex.name.toLowerCase().includes(query) ||
          ex.description.toLowerCase().includes(query) ||
          ex.muscle.toLowerCase().includes(query) ||
          ex.equipment.toLowerCase().includes(query) ||
          ex.targetMuscles.some((m) => m.toLowerCase().includes(query))
      );
    }

    if (category && category !== 'All') {
      result = result.filter((ex) => ex.category.toLowerCase() === category.toLowerCase());
    }

    if (muscle && muscle !== 'All') {
      result = result.filter((ex) =>
        ex.muscle.toLowerCase().includes(muscle.toLowerCase()) ||
        ex.targetMuscles.some((m) => m.toLowerCase().includes(muscle.toLowerCase()))
      );
    }

    if (difficulty && difficulty !== 'All') {
      result = result.filter((ex) => ex.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    res.json({
      success: true,
      count: result.length,
      exercises: result,
      categories,
      muscles,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exercise library: ' + err.message,
    });
  }
};

// @desc    Get single exercise by ID
// @route   GET /api/exercises/:id
exports.getExerciseById = (req, res) => {
  try {
    const exercise = exercises.find((ex) => ex.id === req.params.id);
    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found.',
      });
    }

    res.json({
      success: true,
      exercise,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exercise details.',
    });
  }
};

// @desc    Get exercise filter metadata
// @route   GET /api/exercises/meta/filters
exports.getExerciseFilters = (req, res) => {
  res.json({
    success: true,
    categories,
    muscles,
    difficulties: ['All', 'Beginner', 'Intermediate', 'Advanced'],
  });
};

