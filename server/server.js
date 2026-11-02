const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { connectDB, getIsConnected } = require('./config/db');
const store = require('./utils/store');
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const contactRoutes = require('./routes/contactRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/payment', paymentRoutes);

// System health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    gym: 'Bajarangi Talim',
    version: '1.0.0',
    dbConnected: getIsConnected(),
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend build in production if present
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.use((req, res, next) => {
  if (req.url.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({
        message: 'Bajarangi Talim API is running. Client build not found at ' + clientDistPath,
      });
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const startServer = async () => {
  await connectDB();
  if (getIsConnected()) {
    await store.initDbStore();
  }

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🔥 Bajarangi Talim Server running on http://localhost:${PORT}`);
    console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/`);
    console.log(`⚡ MongoDB Status: ${getIsConnected() ? 'Connected to Atlas' : 'In-Memory Persistence Fallback'}`);
    console.log(`======================================================\n`);
  });
};

startServer();
