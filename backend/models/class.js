"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  courseID: {
    required: true,
    type: String,
    index: {
      unique: true
    }
  },

  courseName: {
    type: String,
    required: true
  },

  transcripts: [
    {
      type: Schema.Types.ObjectId,
      ref: "transcript"
    }
  ],
  professor: {
    type: String,
    required: true,
    default: "staff"
  },
  days: {
    type: String
  },
  time: {
    type: Date
  }
});

module.exports = mongoose.model("class", ClassSchema);
