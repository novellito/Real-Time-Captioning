"use strict";

const express = require("express");
const controller = require("../controllers/login");
const jwt = require('jsonwebtoken');



let router = express.Router();

module.exports = function(io) {

  router.post("/", controller.authenticate);
  router.get('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, data) => {
        if(err) {
          res.sendStatus(403) // error            
        } else {
            console.log('login successful!');
            res.json({data});
        }
    });
  });

  function verifyToken(req,res,next) {
      // get header value
      const bearerHeader = req.headers['authorization'];
      if(typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        next();
      } else {
          res.sendStatus(403) // error
      }

  }
//   router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     res.json({user: req.user});
//   });
 
  return router;
};
