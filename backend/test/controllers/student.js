"use strict";

const chai = require("chai");
const expect = chai.expect;
const chaiHTTP = require("chai-http");
const app = require("../../index");
chai.use(chaiHTTP);

let studentID = null;

describe("Student module", function() {
  this.timeout(5000);

  // POST - Add a new student
  it("Should add a new student", function() {
    return chai
      .request(app)
      .post("/api/students")
      .send({
        username: "test12345",
        name: "John Smith",
        password: "hunter2"
      })
      .then(function(res) {
        studentID = res.body._id;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  // Get all students
  it("Should return all students", function() {
    return chai
      .request(app)
      .get("/api/students")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
      });
  });

  // Update an student with studentID
  it("Should update an student", function() {
    return chai
      .request(app)
      .put(`/api/students/id/${studentID}`)
      .send({
        username: "test54321"
      })
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  //Delete an student with studentID
  it("Should delete an student", function() {
    return chai
      .request(app)
      .delete(`/api/students/id/${studentID}`)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });
});
