"use strict";

const express = require("express");
const controller = require("../controllers/admins");
let router = express.Router();

module.exports = function(io) {
  // Get all admins
  router.get("/", controller.getAllAdmins);
  return router;
};
