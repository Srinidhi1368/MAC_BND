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
  // contact_number:{
  //   type:Number,
  //   unique:true,
  //   required:true
  // },
  resume: {
    type: String 
  },
  userType: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
