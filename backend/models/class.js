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
  ]
});

module.exports = mongoose.model("class", ClassSchema);
