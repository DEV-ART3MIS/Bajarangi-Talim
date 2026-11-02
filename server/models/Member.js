const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.oauthProvider || this.oauthProvider === 'local';
      },
      minlength: 6,
    },
    oauthProvider: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local',
    },
    oauthId: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    membershipPlan: {
      type: String,
      enum: ['Akhada Starter', 'Warrior Pro', 'Bajarangi Elite'],
      default: 'Warrior Pro',
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'annual'],
      default: 'monthly',
    },
    status: {
      type: String,
      enum: ['Active', 'Pending', 'Expired'],
      default: 'Active',
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
    },
    fitnessGoal: {
      type: String,
      default: 'Strength & Conditioning',
    },
    emergencyContact: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['member', 'trainer', 'admin'],
      default: 'member',
    },
    assignedTrainer: {
      type: String,
      default: 'Coach Nikhil Kotkar',
    },
    specialization: {
      type: String,
      default: '',
    },
    coachNotes: {
      type: String,
      default: 'Focus on explosive hip drive during Gada swings; maintain neutral spine on heavy squats.',
    },
    attendanceRate: {
      type: Number,
      default: 94,
    },
    payments: [
      {
        paymentId: { type: String },
        orderId: { type: String },
        amount: { type: Number },
        currency: { type: String, default: 'INR' },
        method: { type: String, default: 'Razorpay UPI/Card' },
        plan: { type: String },
        billingCycle: { type: String },
        status: { type: String, default: 'captured' },
        paidAt: { type: Date, default: Date.now },
      },
    ],
    workoutStats: {
      weeklyWorkouts: { type: Number, default: 4 },
      totalCalories: { type: Number, default: 3450 },
      hoursTrained: { type: Number, default: 6.5 },
      streakDays: { type: Number, default: 5 },
      volumeKg: { type: Number, default: 18400 },
      gadaSwings: { type: Number, default: 120 },
    },
  },
  {
    timestamps: true,
  }
);

// Calculate expiry date before save if not set
memberSchema.pre('save', function (next) {
  if (!this.expiryDate) {
    const months = this.billingCycle === 'annual' ? 12 : 1;
    const expiry = new Date(this.joinDate || Date.now());
    expiry.setMonth(expiry.getMonth() + months);
    this.expiryDate = expiry;
  }
  if (typeof next === 'function') {
    next();
  }
});

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);

module.exports = Member;

