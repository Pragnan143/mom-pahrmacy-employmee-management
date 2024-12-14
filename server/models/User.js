const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  learnings: {
    type: {
      techLearnings: {
        type:String
      },
      nonTechLearnings: {
        type:String
      },
      remarks: {
         type: String, default: ''
      },
      dateAdded:{
        type:String
      } 
    },
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
