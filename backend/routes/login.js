"use strict";

const express = require("express");
const controller = require("../controllers/login");
let router = express.Router();

module.exports = function(io) {

  router.post("/", controller.authenticate);
 
  return router;
};
