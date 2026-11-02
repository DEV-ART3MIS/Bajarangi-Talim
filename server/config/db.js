const mongoose = require('mongoose');
const dns = require('dns');

// On Windows or environments where the local router/DNS refuses SRV records,
// set reliable public DNS servers (Google & Cloudflare) for SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('\n======================================================');
    console.warn('⚠️  MONGODB_URI is not defined in .env');
    console.warn('ℹ️  Running with in-memory persistence fallback.');
    console.warn('ℹ️  To connect to MongoDB Atlas, add your URI in .env:');
    console.warn('    MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/bajarangi_talim?retryWrites=true&w=majority');
    console.warn('======================================================\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`\n✅ MongoDB Atlas Connected: ${conn.connection.host} [Database: ${conn.connection.name}]`);
    return true;
  } catch (err) {
    console.error('\n❌ MongoDB Atlas Connection Error: ' + err.message);
    console.warn('⚠️  Continuing with local in-memory store so the app remains fully functional.');
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };

