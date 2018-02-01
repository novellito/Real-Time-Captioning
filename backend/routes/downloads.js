"use strict";

const express = require("express");
const controller = require("../controllers/downloads");
let router = express.Router();

module.exports = function(io) {

    router.get("/:id/:status", controller.getRTF);
  
    return router;
    
};