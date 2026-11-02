const express = require('express');
const router = express.Router();
const {
  getMembers,
  updateMemberStatus,
  updateMemberPlan,
  getStats,
  updateWorkoutStats,
  updateTraineeNote,
} = require('../controllers/memberController');

router.get('/stats', getStats);
router.get('/', getMembers);
router.put('/:id/status', updateMemberStatus);
router.put('/:id/plan', updateMemberPlan);
router.put('/:id/workout-stats', updateWorkoutStats);
router.put('/:id/coach-note', updateTraineeNote);

module.exports = router;

