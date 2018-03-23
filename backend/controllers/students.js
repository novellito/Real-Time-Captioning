"use strict";
const _ = require("underscore");
const StudentModel = require("../models/student");
let StudentController = {};
var ObjectId = require('mongoose').Types.ObjectId; 
// Storing students.
StudentController.storeStudent = (req, res) => {
  const studentInfo = {
    username:req.body.username,
    name: req.body.name
  };
  let student = new StudentModel(studentInfo);
  let createStudent_Promise = student.save();

  createStudent_Promise
    .then(student => {
      return res.status(201).json(student);
    })
    .catch(err => {
      const DUPLICATE_KEY = 11000;
      return err.code === DUPLICATE_KEY
        ? res.status(400).json(err.errmsg)
        : res.status(500).json(err.errmsg);
    });
};

// Retrieving Students.
StudentController.getAllStudents = (req, res) => {
  let getAllStudents_Promise = StudentModel.find({}).exec();
  getAllStudents_Promise
    .then(students => {
      return res.status(200).json(students);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

StudentController.getStudentById = (req, res) => {
  let studentID = req.params.id;
  let getStudentById_Promise = StudentModel.findById(studentID).exec();

  getStudentById_Promise
    .then(student => {
      return student
        ? res.status(200).json(student)
        : res
            .status(404)
            .json({ error: `Can not find student with id: ${studentID}` });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

StudentController.getStudentByUsername = (req, res) => {
  let username = req.params.username;
  let getStudentById_Promise = StudentModel.find({"username":`${username}`}).populate('classes').exec();

  getStudentById_Promise
    .then(student => {
        if(student.length > 0) {
          console.log('found student');
          console.log(student);
          res.status(200).json(student);
        } else { // student doesnt exist - need to add them to db
          console.log('adding new student to db');
          StudentController.storeStudent({body:{username:username, name:req.params.name}});
        }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

// Updating students.
StudentController.updateStudentByUsername = (req, res) => {
  let username = req.params.username;
  let updateStudentById_Promise = StudentModel.find({$or:[ {$and:[ {"username":`${username}`}, {classes:  {$ne: new ObjectId(req.body._id)}}]}, 
                                 {$and:[{"username":`${username}`}, { 'classes': {$size:0} } ]}]}).populate('classes').exec(); // query for the existing class or if the array is empty
  
  updateStudentById_Promise
    .then(student => {
      _.extend(student, req.body);
      if(!student[0].classes) { // duplicate class being added
        return res.status(500).json({ error: "duplicate class cant be added!" });
      } else {
        student[0].classes.push(req.body); // add class for student
        student[0].save();
        return res.status(201).json(student);
      }
    })
    .catch(err => {
      return res.status(500).json({ error: err.message });
    });
};

// Destroying students.
StudentController.destroyById = (req, res) => {
  let studentID = req.params.id;
  let findByIdAndRemove_Promise = StudentModel.findByIdAndRemove(
    studentID
  ).exec();

  findByIdAndRemove_Promise
    .then(student => {
      return student
        ? res.status(201).json(student)
        : res
            .status(404)
            .json({ error: `No student found with id: ${studentID}` });
    })
    .catch(err => {
      console.log("Error: " + err.message);
      return res.status(500).json({ error: err.message });
    });
};

module.exports = StudentController;
