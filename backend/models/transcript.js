"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const TranscriptSchema = new Schema({
  transcriptName: {
    type: String,
    required: true,
    default: "Untitled"
  },
  courseID: {
    type: Schema.Types.ObjectId,
    ref: "class",
    required: true
  },

  captions: {
    type: Object
  },

  modCaptions: {
    type: Object
  },
  
  captionist: [
    {
      type: Schema.Types.ObjectId,
      ref: "captionist",
      required: true
    }
  ],
  rawStatus: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model("transcript", TranscriptSchema);
