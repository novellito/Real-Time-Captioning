"use strict";

const chai = require("chai");
const expect = chai.expect;
const chaiHTTP = require("chai-http");
const app = require("../../index");
chai.use(chaiHTTP);

let courseID = null;

describe("Class module", function() {
  this.timeout(5000);

  // POST - Add a new course
  it("Should add a new course", function() {
    return chai
      .request(app)
      .post("/api/classes")
      .send({
        courseID: "12345",
        courseName: "Comp 490"
      })
      .then(function(res) {
        courseID = res.body._id;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  // Get all courses
  it("Should return all courses", function() {
    return chai
      .request(app)
      .get("/api/classes")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
      });
  });

  // Update an course with courseID
  it("Should update an course", function() {
    return chai
      .request(app)
      .put(`/api/classes/id/${courseID}`)
      .send({
        courseName: "Comp 482"
      })
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  //Delete an course with courseID
  it("Should delete an course", function() {
    return chai
      .request(app)
      .delete(`/api/classes/id/${courseID}`)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });
});
