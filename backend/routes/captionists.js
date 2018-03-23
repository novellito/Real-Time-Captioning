"use strict";

const express = require("express");
const controller = require("../controllers/captionists");
let router = express.Router();

module.exports = function(io) {
  // Get all captionists.
  router.get("/", controller.getAllCaptionists);
  // Create a new Captionist.
  router.post("/", controller.storeCaptionist);
  // Deletes an Captionist with the specified ID.
  router.delete("/id/:id", controller.destroyById);
  // Get an Captionist by id
  router.get("/id/:id", controller.getCaptionistById);
   // Get an captioner by username
  router.get("/username/:username", controller.getCaptionerByUsername);
  // Update Captionist by username
  router.put("/username/:username", controller.updateCaptionistByUsername);

  return router;
};
