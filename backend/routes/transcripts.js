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
  //Get a Transcript by id
  router.get("/id/:id", controller.getTranscriptById);
  // Get a Transcript by course id
  router.get("/courseID/:id", controller.getTranscriptByCourseId);
  // Update Transcript by id
  router.put("/id/:id", controller.updateTranscriptById);

  return router;
};