"use strict";
const _ = require("underscore");
const CaptionistModel = require("../models/captionist");
const studentsController = require("./students");
var ObjectId = require('mongoose').Types.ObjectId; 

let CaptionistController = {};

// Storing Captionists.
CaptionistController.storeCaptionist = (req, res) => {
  const captionerInfo = {
    username:req.body.username,
    name: req.body.name
  };
  // console.log(captionerInfo);
  let captionist = new CaptionistModel(captionerInfo);
  let createCaptionist_Promise = captionist.save();
  createCaptionist_Promise
  .then(captionist => {
    console.log('new captionist saved!')
    // console.log(captionist)
    return res.status(201).json(captionist);
    })
    .catch(err => {
      const DUPLICATE_KEY = 11000;
      return err.code === DUPLICATE_KEY
        ? res.status(400).json(err.errmsg)
        : res.status(500).json(err.errmsg);
    });
};

// Retrieving Captionists.
CaptionistController.getAllCaptionists = (req, res) => {
  let getAllCaptionists_Promise = CaptionistModel.find({}).exec();
  getAllCaptionists_Promise
    .then(captionists => {
      return res.status(200).json(captionists);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

CaptionistController.getCaptionistById = (req, res) => {
  console.log(req.params)
  let captionistID = req.params.id;
  let getCaptionistById_Promise = CaptionistModel.findById(captionistID).exec();

  getCaptionistById_Promise
    .then(captionist => {
      return captionist
        ? res.status(200).json(captionist)
        : res
            .status(404)
            .json({
              error: `Can not find Captionist with id: ${captionistID}`
            });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

CaptionistController.getCaptionerByUsername = (req, res, next) => {
  console.log(req.body)
  let username = req.params.username;
  let getCaptionistById_Promise = CaptionistModel.find({"username":`${username}`}).populate('classes').exec();

  getCaptionistById_Promise
    .then(captioner => {
        if(captioner.length > 0) {
          console.log(captioner)
          if(req.params.method) {
            next('captioner');
          }
          console.log('captioner exists!');
          res.status(200).json(captioner);
        } else { // do nothing if user is not a captioner
          console.log('user is not a captioner! - checking student!');
          next();
          // studentsController.getStudentByUsername({params:{username:req.params.username,name:req.params.name}});
      
        }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

// Updating Captionists.
CaptionistController.updateCaptionistByUsername = (req, res) => {

  let username = req.params.username;
  let updateCaptionistById_Promise = CaptionistModel.find({$or:[ {$and:[ {username:`${username}`}, {classes:  {$ne: new ObjectId(req.body._id)}}]}, 
                                 {$and:[{username:`${username}`}, { classes: {$size:0} } ]}]}).populate('classes').exec(); // query for the existing class or if the array is empty

  updateCaptionistById_Promise
    .then(captionist => {
      _.extend(captionist, req.body);
      if(captionist.length === 0) { // duplicate class being added
        return res.status(500).json({ error: "duplicate class cant be added!" });
      } else {
        captionist[0].classes.push(req.body); // add class for student
        captionist[0].save();
        return res.status(201).json(captionist);
      }
    })
    .catch(err => {
      return res.status(500).json({ error: err.message });
    });
};

// Destroying Captionists.
CaptionistController.destroyById = (req, res) => {
  let captionistID = req.params.id;
  let findByIdAndRemove_Promise = CaptionistModel.findByIdAndRemove(
    captionistID
  ).exec();

  findByIdAndRemove_Promise
    .then(captionist => {
      return captionist
        ? res.status(201).json(captionist)
        : res
            .status(404)
            .json({ error: `No captionist found with id: ${captionistID}` });
    })
    .catch(err => {
      console.log("Error: " + err.message);
      return res.status(500).json({ error: err.message });
    });
};

module.exports = CaptionistController;
