"use strict";

const express = require("express");
const controller = require("../controllers/classess");
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
  // Update course by id
  router.put("/id/:id", controller.updateCourseById);

  return router;
};
