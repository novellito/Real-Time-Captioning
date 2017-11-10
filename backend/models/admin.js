"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("admin", AdminSchema);
