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
    // required: true,
  },
  conf_password: {
    type: String,
  },

  // contact_number:{
  //   type:Number,
  //   unique:true,
  //   required:true
  // },
  resume: [
    {
      filename: String,
      path: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  userType: {
    type: String,
  },
  userAppliedJob: [
    {
      jobID: {
        type: String,
      }
    }
  ],
  userSavedJob: [
    {
      jobID: {
        type: String,
      }
    }
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
