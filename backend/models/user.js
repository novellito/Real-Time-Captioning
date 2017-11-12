const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));
