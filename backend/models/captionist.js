"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const CaptionistSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  transcripts: [
    {
      type: Schema.Types.ObjectId,
      ref: "trancripts"
    }
  ],
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "class"
    }
  ]
});

module.exports = mongoose.model("captionist", CaptionistSchema);
