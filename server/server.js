const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();



// Use CORS middleware to allow requests from port 3000
const allowedOrigins = ['http://localhost:3000', 'https://momrogersteam.vercel.app/','https://mom-employee.vercel.app/'];

// Configure CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ], // Allowed headers
  exposedHeaders: ['Authorization'], // Headers exposed to the client
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 204, // Status for successful OPTIONS requests
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

// Use the routes
app.get("/", (req, res) => res.send("Express"));
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.error('DB connection error:', err));
});