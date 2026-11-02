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

    // Validate Indian region mobile number if provided
    let formattedPhone = '';
    if (phone && phone.trim()) {
      const cleanDigits = phone.replace(/[\s\-\(\)]/g, '');
      const indianMobileRegex = /^(?:\+91|91|0)?([6-9]\d{9})$/;
      const match = cleanDigits.match(indianMobileRegex);
      if (!match) {
        return res.status(400).json({
          success: false,
          message:
            'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 (e.g., +91 98765 43210).',
        });
      }
      formattedPhone = `+91 ${match[1].slice(0, 5)} ${match[1].slice(5)}`;
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
      phone: formattedPhone || phone || '',
      membershipPlan: membershipPlan || 'Warrior Pro',
      billingCycle: billingCycle || 'monthly',
      fitnessGoal: fitnessGoal || 'Strength & Conditioning',
      status: 'Active',
      role: req.body.role && ['member', 'trainer', 'admin'].includes(req.body.role) ? req.body.role : 'member',
      assignedTrainer: req.body.assignedTrainer || 'Coach Nikhil Kotkar',
      specialization: req.body.specialization || '',
      oauthProvider: 'local',
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

// @desc    OAuth Sign Up & Sign In (Google & GitHub)
// @route   POST /api/auth/oauth
exports.oauthLogin = async (req, res) => {
  try {
    const { provider, email, name, avatar, oauthId, phone } = req.body;

    if (!provider || !['google', 'github'].includes(provider)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OAuth provider. Must be google or github.',
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'OAuth profile did not return a valid email address.',
      });
    }

    // Format Indian phone if provided
    let formattedPhone = '';
    if (phone && phone.trim()) {
      const cleanDigits = phone.replace(/[\s\-\(\)]/g, '');
      const indianMobileRegex = /^(?:\+91|91|0)?([6-9]\d{9})$/;
      const match = cleanDigits.match(indianMobileRegex);
      if (match) {
        formattedPhone = `+91 ${match[1].slice(0, 5)} ${match[1].slice(5)}`;
      }
    }

    // Check if user exists by oauthId or by email
    let user = null;
    if (oauthId) {
      user = await store.findMemberByOAuth(provider, oauthId);
    }
    if (!user) {
      user = await store.findMemberByEmail(email);
    }

    if (user) {
      // User exists: update oauth info if needed
      if (!user.oauthProvider || user.oauthProvider === 'local') {
        user = await store.updateMemberOAuth(user._id, {
          oauthProvider: provider,
          oauthId: oauthId || user.oauthId || `${provider}_${Date.now()}`,
          avatar: avatar || user.avatar,
        });
      }
    } else {
      // Create new user via OAuth
      const salt = await bcrypt.genSalt(10);
      const randomPassword = await bcrypt.hash(`oauth_${provider}_${Date.now()}_${Math.random()}`, salt);

      const defaultName = provider === 'google' ? 'Google Athlete' : 'GitHub Athlete';

      user = await store.createMember({
        name: name || defaultName,
        email: email.toLowerCase(),
        password: randomPassword,
        phone: formattedPhone || phone || '',
        membershipPlan: 'Warrior Pro',
        billingCycle: 'monthly',
        fitnessGoal: 'Strength & Conditioning',
        status: 'Active',
        role: 'member',
        assignedTrainer: 'Coach Nikhil Kotkar',
        specialization: '',
        oauthProvider: provider,
        oauthId: oauthId || `${provider}_${Date.now()}`,
        avatar: avatar || '',
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: `Welcome ${user.name}! Successfully authenticated with ${
        provider.charAt(0).toUpperCase() + provider.slice(1)
      }.`,
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
        oauthProvider: user.oauthProvider || provider,
        avatar: user.avatar || avatar || '',
        joinDate: user.joinDate,
        expiryDate: user.expiryDate,
      },
      dbLive: store.isDbLive(),
    });
  } catch (err) {
    console.error('OAuth sign in error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during OAuth sign in: ' + err.message,
    });
  }
};

