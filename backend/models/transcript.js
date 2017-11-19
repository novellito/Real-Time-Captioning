"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TranscriptSchema = new Schema({
  courseID: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },

  captions: {
    type: String
  },

  captionist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Captionist"
    }
  ],
  rawStatus: {
    type: boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model("transcript", TranscriptSchema);
