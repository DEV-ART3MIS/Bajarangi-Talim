const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('../utils/store');
const { JWT_SECRET } = require('../middleware/auth');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role || 'member',
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Register a new member
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, membershipPlan, billingCycle, fitnessGoal } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email address, and password.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    // Check if user already exists
    const existing = await store.findMemberByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A member with this email address already exists. Please login.',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newMember = await store.createMember({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      membershipPlan: membershipPlan || 'Warrior Pro',
      billingCycle: billingCycle || 'monthly',
      fitnessGoal: fitnessGoal || 'Strength & Conditioning',
      status: 'Active',
      role: req.body.role && ['member', 'trainer', 'admin'].includes(req.body.role) ? req.body.role : 'member',
      assignedTrainer: req.body.assignedTrainer || 'Coach Ananya Roy',
      specialization: req.body.specialization || '',
    });

    const token = generateToken(newMember);

    res.status(201).json({
      success: true,
      message: 'Welcome to Bajarangi Talim! Membership account registered successfully.',
      token,
      user: {
        id: newMember._id,
        name: newMember.name,
        email: newMember.email,
        phone: newMember.phone,
        membershipPlan: newMember.membershipPlan,
        billingCycle: newMember.billingCycle,
        status: newMember.status,
        fitnessGoal: newMember.fitnessGoal,
        role: newMember.role,
        joinDate: newMember.joinDate,
        expiryDate: newMember.expiryDate,
      },
      dbLive: store.isDbLive(),
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during registration: ' + err.message,
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const user = await store.findMemberByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. No member found with this email.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        membershipPlan: user.membershipPlan,
        billingCycle: user.billingCycle,
        status: user.status,
        fitnessGoal: user.fitnessGoal,
        role: user.role,
        joinDate: user.joinDate,
        expiryDate: user.expiryDate,
      },
      dbLive: store.isDbLive(),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during login: ' + err.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await store.findMemberById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }
    res.json({
      success: true,
      user,
      dbLive: store.isDbLive(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving profile.',
    });
  }
};

