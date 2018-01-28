"use strict";

const express = require("express");
const controller = require("../controllers/transcripts");
const controller1 = require("../controllers/downloads");

const http = require("http");

let router = express.Router();

module.exports = function(io) {

    router.get("/:id", controller1.getDelta);
  
    
    return router;
    
};