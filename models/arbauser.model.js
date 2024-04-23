const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, maxlength: 50 },
    fullName : { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, trim: true, match: /^\S+@\S+\.\S+$/, lowercase: true, },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
  
    avatar: { type: String, required: true, },
  },
);

const ArbaUserModel = new mongoose.model("arbaUsersData", userSchema);

module.exports = { ArbaUserModel };
