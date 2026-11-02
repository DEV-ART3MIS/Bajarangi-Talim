const crypto = require('crypto');
const store = require('../utils/store');
const Member = require('../models/Member');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_BajarangiTalimDemo';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'bajarangi_secret_demo_12345';

// @desc    Get Razorpay public configuration
// @route   GET /api/payment/config
exports.getConfig = (req, res) => {
  res.json({
    success: true,
    key_id: RAZORPAY_KEY_ID,
    currency: 'INR',
    businessName: 'बजरंगी तालीम (Hanuman Gym)',
    supportContact: '+91 98765 43210',
    isTestMode: !process.env.RAZORPAY_KEY_ID || RAZORPAY_KEY_ID.includes('test'),
  });
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
exports.createOrder = async (req, res) => {
  try {
    const { planName, billingCycle = 'monthly', amount, memberId } = req.body;

    if (!planName || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Plan name and amount are required.',
      });
    }

    const amountInPaise = Math.round(Number(amount) * 100);
    const orderId = `order_BT_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
    const receipt = `rcpt_${Date.now()}`;

    // Return standard order object
    res.json({
      success: true,
      order: {
        id: orderId,
        entity: 'order',
        amount: amountInPaise,
        amount_paid: 0,
        amount_due: amountInPaise,
        currency: 'INR',
        receipt,
        status: 'created',
        notes: {
          plan: planName,
          cycle: billingCycle,
          gym: 'Bajarangi Talim',
          memberId: memberId || 'guest',
        },
        created_at: Math.floor(Date.now() / 1000),
      },
      key_id: RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create Razorpay order: ' + err.message,
    });
  }
};

// @desc    Verify Razorpay Payment & Activate Subscription
// @route   POST /api/payment/verify
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planName,
      billingCycle = 'monthly',
      amount,
      memberId,
      paymentMethod = 'UPI (Razorpay)',
      isDemo = false,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !planName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification details.',
      });
    }

    // Verify signature if secret and real signature provided
    let isValid = true;
    if (!isDemo && razorpay_signature && process.env.RAZORPAY_KEY_SECRET) {
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
      isValid = generatedSignature === razorpay_signature;
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Razorpay payment signature verification.',
      });
    }

    // Calculate expiry date
    const months = billingCycle === 'annual' ? 12 : 1;
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);

    const paymentRecord = {
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: Number(amount) || (planName === 'Akhada Starter' ? 1499 : planName === 'Warrior Pro' ? 2499 : 4499),
      currency: 'INR',
      method: paymentMethod,
      plan: planName,
      billingCycle,
      status: 'captured',
      paidAt: new Date(),
    };

    let updatedMember = null;
    if (memberId && memberId !== 'guest') {
      if (store.isDbLive()) {
        updatedMember = await Member.findByIdAndUpdate(
          memberId,
          {
            membershipPlan: planName,
            billingCycle,
            status: 'Active',
            expiryDate,
            $push: { payments: paymentRecord },
          },
          { new: true }
        ).select('-password');
      } else {
        updatedMember = await store.updateMemberPlan(memberId, {
          membershipPlan: planName,
          billingCycle,
        });
      }
    }

    res.json({
      success: true,
      message: `🎉 Payment successful! You are now subscribed to ${planName}.`,
      payment: paymentRecord,
      member: updatedMember,
      invoiceNumber: `BT-INV-${Date.now().toString().slice(-6)}`,
      turnstilePassId: updatedMember ? `BT-TALIM-${(updatedMember.id || updatedMember._id).toString().slice(-6).toUpperCase()}` : 'BT-TALIM-ONLINE',
    });
  } catch (err) {
    console.error('Verify Payment Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment: ' + err.message,
    });
  }
};
