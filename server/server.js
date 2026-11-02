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

// Configured CORS to allow both frontend Vercel deployment and local dev
const allowedOrigins = [
  'https://bajarangi-gym.vercel.app',
  'https://bajarangi-talim-server.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json());

// API Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to ensure DB is connected during serverless requests
app.use(async (req, res, next) => {
  if (!getIsConnected() && process.env.MONGODB_URI) {
    try {
      await connectDB();
      if (getIsConnected()) {
        await store.initDbStore();
      }
    } catch (err) {
      console.warn('DB connect error in serverless request:', err.message);
    }
  }
  next();
});

// Root route for backend server verification
app.get('/', (req, res) => {
  res.json({
    gym: 'बजरंगी तालीम (Bajarangi Talim)',
    role: 'Official Backend API Server',
    status: 'online',
    version: '1.0.0',
    connectedFrontend: 'https://bajarangi-gym.vercel.app',
    healthCheck: '/api/health',
    dbConnected: getIsConnected(),
    timestamp: new Date().toISOString(),
  });
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
    gym: 'बजरंगी तालीम',
    version: '1.0.0',
    dbConnected: getIsConnected(),
    connectedFrontend: 'https://bajarangi-gym.vercel.app',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend build in production if present locally
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

// Start listener for local dev or initialize for serverless
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  startServer();
} else {
  connectDB().then(() => {
    if (getIsConnected()) store.initDbStore();
  }).catch(() => {});
}

module.exports = app;
