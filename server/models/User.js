const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  learnings: {
    type: {
      techLearnings: {
        type: [
          {
            topic: { type: String, required: true }, // Tech topic name
            modules: { type: [String], default: [] }, // List of modules for the tech topic
          },
        ],
        default: [],
      },
      nonTechLearnings: {
        type: [
          {
            activity: { type: String, required: true }, // Non-tech activity
            details: { type: String, default: '' }, // Details about the activity
          },
        ],
        default: [],
      },
      remarks: { type: String, default: '' }, // General remarks
    },
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
