"use strict";

const https = require("https");
const config = require("../config/config");
const userModel = require("../models/user");

let AuthController = {};

AuthController.cas = (req, res) => {
  //console.log(req.query);
  let response = "";
  let options = config.casConfiguration; //JSON.parse(JSON.stringify(config.casConfiguration));
  options.path += req.query.ticket;

  console.log(options.path);

  let getRequest = https.request(options, function(res) {
    res.on("data", chunk => {
      console.log(chunk);
      response += chunk;
    });

    res.on("end", () => {
      console.log(response);
    });
  });

  getRequest.end();

  res.json({ hello: "world" });
};

module.exports = AuthController;
