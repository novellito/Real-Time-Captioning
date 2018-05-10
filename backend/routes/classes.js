"use strict";

const express = require("express");
const controller = require("../controllers/classes");
let router = express.Router();

module.exports = function(io) {
  // Get all classes.
  router.get("/", controller.getAllCourses);
  // Create a new class.
  router.post("/", controller.storeCourse);
  // Deletes an course with the specified ID.
  router.delete("/id/:id", controller.destroyById);
  // Get an course by id
  router.get("/id/:id", controller.getCourseById);
  // Get a class by course id
  router.get("/courseID/:id", controller.getClassByCourseId);  
  // Update course by id
  router.put("/id/:id", controller.updateCourseById);

  return router;
};
