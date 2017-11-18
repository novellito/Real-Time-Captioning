"use strict";

const chai = require("chai");
const expect = chai.expect;
const chaiHTTP = require("chai-http");
const app = require("../../index");
chai.use(chaiHTTP);

let adminID = null;

describe("Admin module", function() {
  this.timeout(5000);

  // POST - Add a new admin
  it("Should add a new admin", function() {
    return chai
      .request(app)
      .post("/api/admins")
      .send({
        username: "test12345",
        name: "John Smith",
        password: "hunter2"
      })
      .then(function(res) {
        adminID = res.body._id;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  // Get all admins
  it("Should return all admins", function() {
    return chai
      .request(app)
      .get("/api/admins")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
      });
  });

  // Update an admin with adminID
  it("Should update an admin", function() {
    return chai
      .request(app)
      .put(`/api/admins/id/${adminID}`)
      .send({
        username: "test54321"
      })
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  //Delete an admin with adminID
  it("Should delete an admin", function() {
    return chai
      .request(app)
      .delete(`/api/admins/id/${adminID}`)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });
});
