"use strict";

const express = require("express");
const controller = require("../controllers/auth");
const router = express.Router();

router.get("/cas", controller.cas);

module.exports = router;
