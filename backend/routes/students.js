"use strict";

const express = require("express");
const controller = require("../controllers/students");
let router = express.Router();

module.exports = function(io) {
  // Get all students.
  router.get("/", controller.getAllStudents);
  // Create a new student.
  router.post("/", controller.storeStudent);
  // Deletes an student with the specified ID.
  router.delete("/id/:id", controller.destroyById);
  // Get an student by id
  router.get("/id/:id", controller.getStudentById);
  // Get an student by username
  router.get("/username/:username", controller.getStudentByUsername);
  // Update student by username
  router.put("/username/:username", controller.updateStudentByUsername);

  return router;
};
