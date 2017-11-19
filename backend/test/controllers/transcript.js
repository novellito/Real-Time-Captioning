"use strict";

const chai = require("chai");
const expect = chai.expect;
const chaiHTTP = require("chai-http");
const app = require("../../index");
chai.use(chaiHTTP);

let transcriptID = null;

describe("Transcript module", function() {
  this.timeout(5000);

  // POST - Add a new Transcript
  it("Should add a new transcript", function() {
    return chai
      .request(app)
      .post("/api/transcripts")
      .send({
        courseID: "5a10f8fcec2575181c5648f3",
        captions: "Hello class",
        captionist: ["5a10f8fcec2575181c5648f1"]
      })
      .then(function(res) {
        transcriptID = res.body._id;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  // Get all transcripts
  it("Should return all transcripts", function() {
    return chai
      .request(app)
      .get("/api/transcripts")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
      });
  });

  // Update an transcript with transcriptID
  it("Should update an transcript", function() {
    return chai
      .request(app)
      .put(`/api/transcripts/id/${transcriptID}`)
      .send({
        captions: "Goodbye class."
      })
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });

  //Delete an transcript with transcriptID
  it("Should delete an transcript", function() {
    return chai
      .request(app)
      .delete(`/api/transcripts/id/${transcriptID}`)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
      });
  });
});
