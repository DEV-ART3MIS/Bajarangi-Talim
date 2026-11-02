const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Please enter your message'],
    },
    status: {
      type: String,
      enum: ['unread', 'responded'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = Contact;

