const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Use CORS middleware to allow requests from port 3000
app.use(cors({
  origin: 'http://localhost:3000', // Update with your front-end URL if needed
}));

app.use(express.json());

// Use the routes
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  
  mongoose.connect('mongodb+srv://mompharmacy:mompharmacy@cluster0.xw0cahd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB is connected'))
  .catch((err) => console.error('DB connection error:', err));
});
