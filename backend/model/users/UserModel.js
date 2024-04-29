const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  conf_password: {
    type: String,
  },
  phone_number: {
    type: Number,
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  dob: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  course_start_date: {
    type: Date,
    required: true,
  },
  experience: {
    type: String
  },
  course_end_date: {
    type: Date,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  job_title: {
    type: String,
  },
  company: {
    type: String,
  },
  company_start_date: {
    type: Date,
  },
  company_end_date: {
    type: Date,
  },
  gender: {
    type: String
  },
  website: {
    type: String
  },
  marital_status: {
    type: String
  },
  profileImage: {
    type: String,
  },
  biography: {
    type: String,
  },
  skills: [
    {
      name: { type: String },
      index: { type: Number },
    },
  ],
  note: {
    type: String,
  },
  resume: [
    {
      filename: String,
      path: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  userType: {
    type: String,
  },
  userAppliedJob: [
    {
      jobID: {
        type: String,
      },
    },
  ],
  userSavedJob: [
    {
      jobID: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;