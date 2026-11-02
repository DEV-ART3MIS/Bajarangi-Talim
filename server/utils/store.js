const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Member = require('../models/Member');
const Contact = require('../models/Contact');

// In-memory fallback stores
let memoryMembers = [];
let memoryContacts = [];

// Seed default demo user and admin into memory fallback
const initMemoryStore = async () => {
  if (memoryMembers.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const demoHashedPassword = await bcrypt.hash('bajarangi123', salt);

    memoryMembers.push(
      {
        _id: 'mem_001',
        name: 'Baliram Kotkar',
        email: 'baliram@bajarangitalim.com',
        password: demoHashedPassword,
        phone: '+91 98765 43210',
        membershipPlan: 'Bajarangi Elite',
        billingCycle: 'annual',
        status: 'Active',
        joinDate: new Date('2025-01-15'),
        expiryDate: new Date('2027-01-15'),
        fitnessGoal: 'Traditional Kushti & Akhada Conditioning',
        emergencyContact: '+91 98765 00000',
        role: 'admin',
        specialization: 'Chief Ustad, Head Pehlwan & Gym Owner',
        assignedTrainer: 'Self',
        attendanceRate: 99,
        workoutStats: {
          weeklyWorkouts: 6,
          totalCalories: 5400,
          hoursTrained: 10.0,
          streakDays: 21,
          volumeKg: 31000,
          gadaSwings: 350,
        },
        coachNotes: 'Supervising traditional Akhada mud pit, Gada practice, and strength arena at Ghulewadi.',
        createdAt: new Date('2025-01-15'),
      },
      {
        _id: 'mem_002',
        name: 'Nikhil Kotkar',
        email: 'nikhil@bajarangitalim.com',
        password: demoHashedPassword,
        phone: '+91 97654 32109',
        membershipPlan: 'Bajarangi Elite',
        billingCycle: 'annual',
        status: 'Active',
        joinDate: new Date('2025-03-01'),
        expiryDate: new Date('2027-03-01'),
        fitnessGoal: 'Maximal Powerlifting & Strength Biomechanics',
        emergencyContact: '+91 97654 00000',
        role: 'trainer',
        specialization: 'Head Strength & Conditioning Coach',
        assignedTrainer: 'Baliram Kotkar',
        attendanceRate: 97,
        workoutStats: {
          weeklyWorkouts: 5,
          totalCalories: 4300,
          hoursTrained: 8.5,
          streakDays: 12,
          volumeKg: 25000,
          gadaSwings: 180,
        },
        coachNotes: 'Managing barbell kinematics, powerlifting racks, and heavy progressive overload routines.',
        createdAt: new Date('2025-03-01'),
      },
      {
        _id: 'mem_006',
        name: 'Shyam Kotkar',
        email: 'shyam@bajarangitalim.com',
        password: demoHashedPassword,
        phone: '+91 98112 23344',
        membershipPlan: 'Bajarangi Elite',
        billingCycle: 'annual',
        status: 'Active',
        joinDate: new Date('2025-04-01'),
        expiryDate: new Date('2027-04-01'),
        fitnessGoal: 'Traditional Gada Rotations & Bodyweight Calisthenics',
        emergencyContact: '+91 98112 00000',
        role: 'trainer',
        specialization: 'Traditional Gada Master & Calisthenics Specialist',
        assignedTrainer: 'Baliram Kotkar',
        attendanceRate: 96,
        workoutStats: {
          weeklyWorkouts: 5,
          totalCalories: 4000,
          hoursTrained: 8.0,
          streakDays: 10,
          volumeKg: 21000,
          gadaSwings: 400,
        },
        coachNotes: 'Leading mud pit rotations, heavy Gada swings (up to 40kg), and calisthenics mobility.',
        createdAt: new Date('2025-04-01'),
      },
      {
        _id: 'mem_003',
        name: 'Aarav Sharma',
        email: 'aarav@example.com',
        password: demoHashedPassword,
        phone: '+91 91234 56789',
        membershipPlan: 'Warrior Pro',
        billingCycle: 'monthly',
        status: 'Active',
        joinDate: new Date('2026-02-10'),
        expiryDate: new Date('2026-11-10'),
        fitnessGoal: 'Strength & Hypertrophy',
        emergencyContact: '+91 91234 00000',
        role: 'member',
        specialization: '',
        assignedTrainer: 'Coach Ananya Roy',
        attendanceRate: 94,
        workoutStats: {
          weeklyWorkouts: 4,
          totalCalories: 3450,
          hoursTrained: 6.5,
          streakDays: 5,
          volumeKg: 18400,
          gadaSwings: 120,
        },
        coachNotes: 'Increased back squat working weight to 140kg. Gada swing shoulder stability looking very clean.',
        createdAt: new Date('2026-02-10'),
      },
      {
        _id: 'mem_004',
        name: 'Rohan Deshmukh',
        email: 'rohan@example.com',
        password: demoHashedPassword,
        phone: '+91 99887 76655',
        membershipPlan: 'Akhada Starter',
        billingCycle: 'monthly',
        status: 'Pending',
        joinDate: new Date('2026-10-25'),
        expiryDate: new Date('2026-11-25'),
        fitnessGoal: 'Weight Loss & Calisthenics',
        emergencyContact: '+91 99887 00000',
        role: 'member',
        specialization: '',
        assignedTrainer: 'Coach Ananya Roy',
        attendanceRate: 78,
        workoutStats: {
          weeklyWorkouts: 3,
          totalCalories: 2100,
          hoursTrained: 4.5,
          streakDays: 2,
          volumeKg: 9200,
          gadaSwings: 60,
        },
        coachNotes: 'Needs attention on Surya Dand form. Reminder sent regarding membership renewal.',
        createdAt: new Date('2026-10-25'),
      },
      {
        _id: 'mem_005',
        name: 'Pooja Patil',
        email: 'pooja@example.com',
        password: demoHashedPassword,
        phone: '+91 94567 89012',
        membershipPlan: 'Bajarangi Elite',
        billingCycle: 'annual',
        status: 'Active',
        joinDate: new Date('2026-01-10'),
        expiryDate: new Date('2027-01-10'),
        fitnessGoal: 'Powerlifting & Athletic Mobility',
        emergencyContact: '+91 94567 00000',
        role: 'member',
        specialization: '',
        assignedTrainer: 'Master Coach Vikram Shinde',
        attendanceRate: 95,
        workoutStats: {
          weeklyWorkouts: 5,
          totalCalories: 3800,
          hoursTrained: 7.2,
          streakDays: 8,
          volumeKg: 20100,
          gadaSwings: 180,
        },
        coachNotes: 'Great deadlift lockout progress. Ready for competition-spec barbell testing.',
        createdAt: new Date('2026-01-10'),
      }
    );

    memoryContacts.push({
      _id: 'cnt_001',
      name: 'Pooja Patil',
      email: 'pooja.p@example.com',
      phone: '+91 94567 89012',
      subject: 'Personal Training for Traditional Akhada Gada',
      message: 'Hi, I want to learn traditional Gada swinging and core conditioning with Coach Vikram. What are the available morning time slots?',
      status: 'unread',
      createdAt: new Date(),
    });
  }
};

initMemoryStore();

const isDbLive = () => mongoose.connection && mongoose.connection.readyState === 1;

const initDbStore = async () => {
  try {
    if (!isDbLive()) return;
    const count = await Member.countDocuments();
    if (count === 0) {
      const salt = await bcrypt.genSalt(10);
      const demoHashedPassword = await bcrypt.hash('bajarangi123', salt);

      await Member.create([
        {
          name: 'Bajrang Coach Vikram',
          email: 'vikram@bajarangitalim.com',
          password: demoHashedPassword,
          phone: '+91 98765 43210',
          membershipPlan: 'Bajarangi Elite',
          billingCycle: 'annual',
          status: 'Active',
          joinDate: new Date('2025-01-15'),
          expiryDate: new Date('2027-01-15'),
          fitnessGoal: 'Wrestling & Akhada Conditioning',
          emergencyContact: '+91 98765 00000',
          role: 'admin',
        },
        {
          name: 'Aarav Sharma',
          email: 'aarav@example.com',
          password: demoHashedPassword,
          phone: '+91 91234 56789',
          membershipPlan: 'Warrior Pro',
          billingCycle: 'monthly',
          status: 'Active',
          joinDate: new Date('2026-02-10'),
          expiryDate: new Date('2026-11-10'),
          fitnessGoal: 'Strength & Hypertrophy',
          emergencyContact: '+91 91234 00000',
          role: 'member',
        },
        {
          name: 'Rohan Deshmukh',
          email: 'rohan@example.com',
          password: demoHashedPassword,
          phone: '+91 99887 76655',
          membershipPlan: 'Akhada Starter',
          billingCycle: 'monthly',
          status: 'Pending',
          joinDate: new Date('2026-10-25'),
          expiryDate: new Date('2026-11-25'),
          fitnessGoal: 'Weight Loss & Calisthenics',
          emergencyContact: '+91 99887 00000',
          role: 'member',
        },
      ]);
      console.log('📦 Initial demo gym members seeded into MongoDB Atlas.');
    }

    // Ensure Baliram Kotkar exists (Gym Owner / Admin)
    const baliramExists = await Member.findOne({ email: 'baliram@bajarangitalim.com' });
    if (!baliramExists) {
      const salt = await bcrypt.genSalt(10);
      const demoHashedPassword = await bcrypt.hash('bajarangi123', salt);
      await Member.create({
        name: 'Baliram Kotkar',
        email: 'baliram@bajarangitalim.com',
        password: demoHashedPassword,
        phone: '+91 98765 43210',
        membershipPlan: 'Bajarangi Elite',
        billingCycle: 'annual',
        status: 'Active',
        role: 'admin',
        specialization: 'Chief Ustad, Head Pehlwan & Gym Owner',
        assignedTrainer: 'Self',
        attendanceRate: 99,
        workoutStats: {
          weeklyWorkouts: 6,
          totalCalories: 5400,
          hoursTrained: 10.0,
          streakDays: 21,
          volumeKg: 31000,
          gadaSwings: 350,
        },
        coachNotes: 'Supervising traditional Akhada mud pit, Gada practice, and strength arena at Ghulewadi.',
      });
      console.log('🥋 Seeded Baliram Kotkar (Owner/Admin) into MongoDB Atlas.');
    }

    // Ensure trainer Nikhil Kotkar exists
    const nikhilExists = await Member.findOne({ email: 'nikhil@bajarangitalim.com' });
    if (!nikhilExists) {
      const salt = await bcrypt.genSalt(10);
      const demoHashedPassword = await bcrypt.hash('bajarangi123', salt);
      await Member.create({
        name: 'Nikhil Kotkar',
        email: 'nikhil@bajarangitalim.com',
        password: demoHashedPassword,
        phone: '+91 97654 32109',
        membershipPlan: 'Bajarangi Elite',
        billingCycle: 'annual',
        status: 'Active',
        role: 'trainer',
        specialization: 'Head Strength & Conditioning Coach',
        assignedTrainer: 'Baliram Kotkar',
        attendanceRate: 97,
        workoutStats: {
          weeklyWorkouts: 5,
          totalCalories: 4300,
          hoursTrained: 8.5,
          streakDays: 12,
          volumeKg: 25000,
          gadaSwings: 180,
        },
        coachNotes: 'Managing barbell kinematics, powerlifting racks, and heavy progressive overload routines.',
      });
      console.log('🥋 Seeded Nikhil Kotkar (Trainer) into MongoDB Atlas.');
    }

    // Ensure trainer Shyam Kotkar exists
    const shyamExists = await Member.findOne({ email: 'shyam@bajarangitalim.com' });
    if (!shyamExists) {
      const salt = await bcrypt.genSalt(10);
      const demoHashedPassword = await bcrypt.hash('bajarangi123', salt);
      await Member.create({
        name: 'Shyam Kotkar',
        email: 'shyam@bajarangitalim.com',
        password: demoHashedPassword,
        phone: '+91 98112 23344',
        membershipPlan: 'Bajarangi Elite',
        billingCycle: 'annual',
        status: 'Active',
        role: 'trainer',
        specialization: 'Traditional Gada Master & Calisthenics Specialist',
        assignedTrainer: 'Baliram Kotkar',
        attendanceRate: 96,
        workoutStats: {
          weeklyWorkouts: 5,
          totalCalories: 4000,
          hoursTrained: 8.0,
          streakDays: 10,
          volumeKg: 21000,
          gadaSwings: 400,
        },
        coachNotes: 'Leading mud pit rotations, heavy Gada swings (up to 40kg), and calisthenics mobility.',
      });
      console.log('🥋 Seeded Shyam Kotkar (Trainer) into MongoDB Atlas.');
    }

    // Ensure Pooja Patil exists
    const poojaExists = await Member.findOne({ email: 'pooja@example.com' });
    if (!poojaExists) {
      const salt = await bcrypt.genSalt(10);
      const demoHashedPassword = await bcrypt.hash('bajarangi123', salt);
      await Member.create({
        name: 'Pooja Patil',
        email: 'pooja@example.com',
        password: demoHashedPassword,
        phone: '+91 94567 89012',
        membershipPlan: 'Bajarangi Elite',
        billingCycle: 'annual',
        status: 'Active',
        role: 'member',
        fitnessGoal: 'Powerlifting & Athletic Mobility',
        assignedTrainer: 'Coach Ananya Roy',
        attendanceRate: 95,
        workoutStats: {
          weeklyWorkouts: 5,
          totalCalories: 3800,
          hoursTrained: 7.2,
          streakDays: 8,
          volumeKg: 20100,
          gadaSwings: 180,
        },
        coachNotes: 'Great deadlift lockout progress. Ready for competition-spec barbell testing.',
      });
      console.log('🥋 Seeded Pooja Patil (Member) into MongoDB Atlas.');
    }

    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.create({
        name: 'Pooja Patil',
        email: 'pooja.p@example.com',
        phone: '+91 94567 89012',
        subject: 'Personal Training for Traditional Akhada Gada',
        message: 'Hi, I want to learn traditional Gada swinging and core conditioning with Coach Vikram. What are the available morning time slots?',
        status: 'unread',
      });
      console.log('📦 Initial contact inquiry seeded into MongoDB Atlas.');
    }
  } catch (err) {
    console.warn('⚠️ Seeding MongoDB Atlas:', err.message);
  }
};

// Member store methods
const store = {
  isDbLive,
  initDbStore,

  async findMemberByEmail(email) {
    if (isDbLive()) {
      return await Member.findOne({ email: email.toLowerCase() });
    }
    return memoryMembers.find((m) => m.email.toLowerCase() === email.toLowerCase());
  },

  async findMemberById(id) {
    if (isDbLive()) {
      return await Member.findById(id).select('-password');
    }
    const mem = memoryMembers.find((m) => m._id.toString() === id.toString());
    if (!mem) return null;
    const { password, ...safeMem } = mem;
    return safeMem;
  },

  async createMember(data) {
    if (isDbLive()) {
      return await Member.create(data);
    }
    const newMember = {
      _id: 'mem_' + Date.now(),
      ...data,
      email: data.email.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (!newMember.expiryDate) {
      const months = newMember.billingCycle === 'annual' ? 12 : 1;
      const expiry = new Date(newMember.joinDate || Date.now());
      expiry.setMonth(expiry.getMonth() + months);
      newMember.expiryDate = expiry;
    }
    memoryMembers.push(newMember);
    return newMember;
  },

  async getAllMembers() {
    if (isDbLive()) {
      return await Member.find().select('-password').sort({ createdAt: -1 });
    }
    return memoryMembers.map(({ password, ...rest }) => rest).reverse();
  },

  async updateMemberStatus(id, status) {
    if (isDbLive()) {
      return await Member.findByIdAndUpdate(id, { status }, { new: true }).select('-password');
    }
    const index = memoryMembers.findIndex((m) => m._id.toString() === id.toString());
    if (index !== -1) {
      memoryMembers[index].status = status;
      memoryMembers[index].updatedAt = new Date();
      const { password, ...safe } = memoryMembers[index];
      return safe;
    }
    return null;
  },

  async updateMemberPlan(id, { membershipPlan, billingCycle }) {
    const months = billingCycle === 'annual' ? 12 : 1;
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + months);

    if (isDbLive()) {
      return await Member.findByIdAndUpdate(
        id,
        { membershipPlan, billingCycle, status: 'Active', expiryDate: expiry },
        { new: true }
      ).select('-password');
    }
    const index = memoryMembers.findIndex((m) => m._id.toString() === id.toString());
    if (index !== -1) {
      memoryMembers[index].membershipPlan = membershipPlan;
      memoryMembers[index].billingCycle = billingCycle;
      memoryMembers[index].status = 'Active';
      memoryMembers[index].expiryDate = expiry;
      memoryMembers[index].updatedAt = new Date();
      const { password, ...safe } = memoryMembers[index];
      return safe;
    }
    return null;
  },

  async updateWorkoutStats(id, workoutStats) {
    if (isDbLive()) {
      return await Member.findByIdAndUpdate(
        id,
        { $set: { workoutStats } },
        { new: true }
      ).select('-password');
    }
    const index = memoryMembers.findIndex((m) => m._id.toString() === id.toString());
    if (index !== -1) {
      memoryMembers[index].workoutStats = {
        ...memoryMembers[index].workoutStats,
        ...workoutStats,
      };
      memoryMembers[index].updatedAt = new Date();
      const { password, ...safe } = memoryMembers[index];
      return safe;
    }
    return null;
  },

  async updateTraineeNote(id, coachNotes) {
    if (isDbLive()) {
      return await Member.findByIdAndUpdate(
        id,
        { coachNotes },
        { new: true }
      ).select('-password');
    }
    const index = memoryMembers.findIndex((m) => m._id.toString() === id.toString());
    if (index !== -1) {
      memoryMembers[index].coachNotes = coachNotes;
      memoryMembers[index].updatedAt = new Date();
      const { password, ...safe } = memoryMembers[index];
      return safe;
    }
    return null;
  },

  async updateTraineeTrainer(id, assignedTrainer) {
    if (isDbLive()) {
      return await Member.findByIdAndUpdate(
        id,
        { assignedTrainer },
        { new: true }
      ).select('-password');
    }
    const index = memoryMembers.findIndex((m) => m._id.toString() === id.toString());
    if (index !== -1) {
      memoryMembers[index].assignedTrainer = assignedTrainer;
      memoryMembers[index].updatedAt = new Date();
      const { password, ...safe } = memoryMembers[index];
      return safe;
    }
    return null;
  },

  // Contact store methods
  async createContact(data) {
    if (isDbLive()) {
      return await Contact.create(data);
    }
    const newContact = {
      _id: 'cnt_' + Date.now(),
      ...data,
      status: 'unread',
      createdAt: new Date(),
    };
    memoryContacts.unshift(newContact);
    return newContact;
  },

  async getAllContacts() {
    if (isDbLive()) {
      return await Contact.find().sort({ createdAt: -1 });
    }
    return memoryContacts;
  },
};

module.exports = store;

