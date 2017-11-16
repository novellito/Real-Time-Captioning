"use strict";

const chai = require("chai");
const expect = chai.expect;
const chaiHTTP = require("chai-http");
const app = require("../../index");

chai.use(chaiHTTP);

describe("Admin controller", function() {
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
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

  // Get all admins
  it("Should return all admins", function() {
    return chai
      .request(app)
      .get("/api/admins")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
});
