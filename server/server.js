const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Use the routes
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running onm Port ${PORT}`)
  mongoose.connect('mongodb+srv://mompharmacy:mompharmacy@cluster0.xw0cahd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(console.log("DB is connected"));
});
