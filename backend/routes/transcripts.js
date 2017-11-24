"use strict";

const express = require("express");
const controller = require("../controllers/transcripts");
let router = express.Router();

module.exports = function(io) {
  // Get all transcripts.
  router.get("/", controller.getAllTranscripts);
  // Create a new Transcript.
  router.post("/", controller.storeTranscript);
  // Deletes an Transcript with the specified ID.
  router.delete("/id/:id", controller.destroyById);
  // Get an Transcript by id
  router.get("/id/:id", controller.getTranscriptById);
  // Update Transcript by id
  router.put("/id/:id", controller.updateTranscriptById);

  return router;
};

//db.getCollection('transcripts').find({"courseID":ObjectId("5a1767bfe4017636b0600de8")});

