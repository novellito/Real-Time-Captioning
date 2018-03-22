"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    type: String,
    required: true
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "class"
    }
  ]
});

module.exports = mongoose.model("student", StudentSchema);
