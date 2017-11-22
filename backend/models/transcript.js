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
    type: Object
  },

  captionist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Captionist"
    }
  ],
  rawStatus: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model("transcript", TranscriptSchema);
