"use strict";

const express = require("express");
const controller = require("../controllers/login");

let router = express.Router();

module.exports = function(io) {

  router.post("/", controller.authenticate);
  router.get('/', controller.verifyToken , controller.jwtVerify);

 
  return router;
};
