const express = require('express');
const router = express.Router();
const {
  getExercises,
  getExerciseById,
  getExerciseFilters,
} = require('../controllers/exerciseController');

router.get('/', getExercises);
router.get('/meta/filters', getExerciseFilters);
router.get('/:id', getExerciseById);

module.exports = router;

