const store = require('../utils/store');

// @desc    Submit a contact form message
// @route   POST /api/contact
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, email, and message.',
      });
    }

    const contact = await store.createContact({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting Bajarangi Talim! Our team will reach back out within 24 hours.',
      contact,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact message: ' + err.message,
    });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
exports.getContacts = async (req, res) => {
  try {
    const contacts = await store.getAllContacts();
    res.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact inquiries.',
    });
  }
};

