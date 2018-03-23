"use strict";
const _ = require("underscore");
const ClassModel = require("../models/class");
let ClassController = {};

// Storing classes.
ClassController.storeCourse = (req, res) => {
  // console.log(req.body.courseID)
  let courseToSave = new ClassModel(req.body); 

  let getTranscriptById_Promise = ClassModel.find({"courseID":`${req.body.courseID}`}, function(err, course){
    if(course.length > 0) { // if found then don't save it.
    console.log('found the class')
    // console.log(course)
    res.status(200).json(course[0]);
    // res.status(200).json({course, status:200})
  } else { // does not exist so save it.
    
    courseToSave.save();
    console.log('saved class')
    return res.status(201).json(courseToSave);
    // createCourse_Promise
    //   .then(courseToSave => {
    //     return res.status(201).json(courseToSave);
    //   })
    
  }
  }).exec();

  // getTranscriptById_Promise
  // .then(course => {
  //   if(course) { // if found then don't save it.
  //     res.status(200).json(course)
  //   } else { // does not exist so save it.
  //     // console.log(course)
  //     console.log(req.body)
  //     let courseToSave = new ClassModel(req.body); 
      
  //     let createCourse_Promise = courseToSave.save();
  //     createCourse_Promise
  //       .then(courseToSave => {
  //         return res.status(201).json(courseToSave);
  //       })
      
  //   }
      
  // })
  // .catch(err => {
  //   console.log(err);
  //   return res.status(500).json({ error: err });
  // });
  
  

};

// Retrieving classes.
ClassController.getAllCourses = (req, res) => {
  let getAllCourses_Promise = ClassModel.find({}).exec();
  getAllCourses_Promise
    .then(courses => {
      return res.status(200).json(courses);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

ClassController.getCourseById = (req, res) => {
  
  let courseID = req.params.id;
  let getCourseById_Promise = ClassModel.findById(courseID).exec();

  getCourseById_Promise
    .then(course => {
      return course
        ? res.status(200).json(course)
        : res
            .status(404)
            .json({ error: `Can not find course with id: ${courseID}` });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

ClassController.getClassByCourseId = (req, res) => {
  console.log(req.params)
  let courseID = req.params.id;
  let getTranscriptById_Promise = ClassModel.find({"courseID":`${courseID}`}).exec();

  getTranscriptById_Promise
    .then(course => {
      return course
        ? res.status(200).json(course)
        : res.status(404).json({
            error: `Can not find course with id: ${courseID}`
          });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};


// Updating courses.
ClassController.updateCourseById = (req, res) => {
  let courseID = req.params.id;
  let updateCourseById_Promise = ClassModel.findById(courseID).populate('transcripts').exec(function(err, course) {
    // console.log(course);
    course.transcripts.push(req.transcripts); // add transcript to course
     console.log(course.transcripts);
    
    return course.save();
    });
  // updateCourseById_Promise
  //   .then(course => {
  //     _.extend(course, req.body);
  //     course.transcripts.push(req.transcripts); // add transcript to course
  //     course.populate('transcripts');
  //   //  console.log(course.transcripts);
  //     return course.save();
  //   })
  //   .then(course => {
  //     return res.status(201).json(course);
  //   })
  //   .catch(err => {
  //     return res.status(500).json({ error: err.message });
  //   });
};

// Destroying courses.
ClassController.destroyById = (req, res) => {
  let courseID = req.params.id;
  let findByIdAndRemove_Promise = ClassModel.findByIdAndRemove(courseID).exec();

  findByIdAndRemove_Promise
    .then(course => {
      return course
        ? res.status(201).json(course)
        : res
            .status(404)
            .json({ error: `No course found with id: ${courseID}` });
    })
    .catch(err => {
      console.log("Error: " + err.message);
      return res.status(500).json({ error: err.message });
    });
};

module.exports = ClassController;
