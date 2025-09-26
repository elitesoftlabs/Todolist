const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobposts', // 👈 must match your jobs collection model name
    required: true
  },
  jobseeker_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // 👈 must match your usersModel name
    required: true
  },
  Application_Status: {
    type: String,
    default: 'Applied'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('applications', applicationSchema);
