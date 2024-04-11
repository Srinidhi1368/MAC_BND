const mongoose = require("mongoose");

const hrSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  jobTitle: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
  },
});

const HrUser = mongoose.model("HrUser", hrSchema);

module.exports = HrUser;
