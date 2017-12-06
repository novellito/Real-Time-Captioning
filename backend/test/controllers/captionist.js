"use strict";

const chai = require("chai");
const expect = chai.expect;
const chaiHTTP = require("chai-http");
const app = require("../../index");
chai.use(chaiHTTP);

let captionistID = null;

describe("Captionist module", function() {
  this.timeout(5000);

  // POST - Add a new captionist
  it("Should add a new captionist", function() {
    return chai
      .request(app)
      .post("/api/captionists")
      .send({
        username: "Cap42867",
        name: "John Smith"
      })
      .then(function(res) {
        captionistID = res.body._id;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  // Get all captionists
  it("Should return all captionists", function() {
    return chai
      .request(app)
      .get("/api/captionists")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
      });
  });

  // Update an captionist with captionistID
  it("Should update an captionist", function() {
    return chai
      .request(app)
      .put(`/api/captionists/id/${captionistID}`)
      .send({
        username: "test54321"
      })
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  //Delete an captionist with captionistID
  it("Should delete an captionist", function() {
    return chai
      .request(app)
      .delete(`/api/captionists/id/${captionistID}`)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });
});
