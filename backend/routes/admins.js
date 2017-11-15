"use strict";

const express = require("express");
const controller = require("../controllers/admins");
let router = express.Router();

module.exports = function(io) {
  // Get all admins.
  router.get("/", controller.getAllAdmins);
  // Create a new admin.
  router.post("/", controller.storeAdmin);
  // Deletes an admin with the specified ID.
  router.delete("/id/:id", controller.destroyById);

  return router;
};
