const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    learnings: [
      {
        techLearnings: { type: String, required: true }, // Specific tech learning
        nonTechLearnings: { type: String }, // Specific non-tech learning
        remarks: { type: String, default: '' }, // General remarks
        extras: { type: String, default: '' },
        dateAdded: { type: String, default: Date.now }, // Date of learning
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
