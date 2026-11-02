const store = require('../utils/store');

// @desc    Get all members
// @route   GET /api/members
exports.getMembers = async (req, res) => {
  try {
    const members = await store.getAllMembers();
    res.json({
      success: true,
      count: members.length,
      members,
      dbLive: store.isDbLive(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve members: ' + err.message,
    });
  }
};

// @desc    Update member status
// @route   PUT /api/members/:id/status
exports.updateMemberStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'Pending', 'Expired'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed values: Active, Pending, Expired.',
      });
    }

    const updated = await store.updateMemberStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Member not found.',
      });
    }

    res.json({
      success: true,
      message: `Member status updated to ${status}.`,
      member: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update member status.',
    });
  }
};

// @desc    Update member membership plan
// @route   PUT /api/members/:id/plan
exports.updateMemberPlan = async (req, res) => {
  try {
    const { membershipPlan, billingCycle } = req.body;
    if (!membershipPlan) {
      return res.status(400).json({
        success: false,
        message: 'Please provide membershipPlan.',
      });
    }

    const updated = await store.updateMemberPlan(req.params.id, {
      membershipPlan,
      billingCycle: billingCycle || 'monthly',
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Member not found.',
      });
    }

    res.json({
      success: true,
      message: `Plan upgraded to ${membershipPlan} successfully!`,
      member: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update plan.',
    });
  }
};

// @desc    Get gym business overview stats
// @route   GET /api/members/stats
exports.getStats = async (req, res) => {
  try {
    const members = await store.getAllMembers();
    const active = members.filter((m) => m.status === 'Active').length;
    const pending = members.filter((m) => m.status === 'Pending').length;
    const expired = members.filter((m) => m.status === 'Expired').length;

    // Subscriptions taken breakdown
    const subscriptions = {
      starter: members.filter((m) => m.membershipPlan === 'Akhada Starter').length,
      warrior: members.filter((m) => m.membershipPlan === 'Warrior Pro').length,
      elite: members.filter((m) => m.membershipPlan === 'Bajarangi Elite').length,
      monthly: members.filter((m) => m.billingCycle === 'monthly').length,
      annual: members.filter((m) => m.billingCycle === 'annual').length,
    };

    const activeMembersList = members.filter((m) => m.status === 'Active');
    const monthlyRevenue = activeMembersList.reduce((acc, m) => {
      const base = m.membershipPlan === 'Bajarangi Elite' ? 3999 : m.membershipPlan === 'Warrior Pro' ? 2499 : 1499;
      return acc + (m.billingCycle === 'annual' ? Math.round(base * 0.8) : base);
    }, 0);

    const trainersCount = members.filter((m) => m.role === 'trainer' || m.role === 'admin').length || 6;
    const totalTrainees = members.filter((m) => m.role === 'member').length;

    res.json({
      success: true,
      stats: {
        totalMembers: members.length,
        activeMembers: active,
        pendingMembers: pending,
        expiredMembers: expired,
        totalTrainers: trainersCount,
        totalTrainees,
        monthlyRevenue: `₹${monthlyRevenue.toLocaleString('en-IN')}`,
        subscriptions,
        floorAreaSqFt: '12,000',
        establishedYear: 1982,
      },
      dbLive: store.isDbLive(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats.',
    });
  }
};

// @desc    Update member workout stats
// @route   PUT /api/members/:id/workout-stats
exports.updateWorkoutStats = async (req, res) => {
  try {
    const updated = await store.updateWorkoutStats(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Member not found.' });
    }
    res.json({
      success: true,
      message: 'Workout stats updated successfully!',
      member: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update coach note for a trainee
// @route   PUT /api/members/:id/coach-note
exports.updateTraineeNote = async (req, res) => {
  try {
    const { coachNotes } = req.body;
    const updated = await store.updateTraineeNote(req.params.id, coachNotes);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Trainee not found.' });
    }
    res.json({
      success: true,
      message: 'Coach note updated successfully!',
      member: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

