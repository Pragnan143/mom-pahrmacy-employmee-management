const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:3000', 'https://mom-employmee.vercel.app'];

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Express API is running');
});
app.use('/user', userRoutes);

// MongoDB Connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    const db = await mongoose.connect("mongodb+srv://mompharmacy:mompharmacy@cluster0.xw0cahd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    cachedDb = db;
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

// Check environment and start server or export handler
if (process.env.NODE_ENV !== 'production') {
  // For local development
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    try {
      await connectToDatabase(); // Connect to the database
      console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
      console.error('Error starting the server:', err);
    }
  });
} else {
  // For Vercel deployment
  module.exports = async (req, res) => {
    try {
      await connectToDatabase(); // Ensure DB is connected
      app(req, res); // Pass request to Express
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };
}
