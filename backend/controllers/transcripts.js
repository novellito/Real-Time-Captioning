"use strict";
const _ = require("underscore");
const TranscriptModel = require("../models/transcript");
let TranscriptController = {};

// Storing Transcripts.
TranscriptController.storeTranscript = (req, res) => {
  let transcript = new TranscriptModel(req.body);
  let createTranscript_Promise = transcript.save();

  createTranscript_Promise
    .then(transcript => {
      return res.status(201).json(transcript);
    })
    .catch(err => {
      const DUPLICATE_KEY = 11000;
      return err.code === DUPLICATE_KEY
        ? res.status(400).json(err.errmsg)
        : res.status(500).json(err);
    });
};

// Retrieving Transcripts.
TranscriptController.getAllTranscripts = (req, res) => {
  let getAllTranscripts_Promise = TranscriptModel.find({}).exec();
  getAllTranscripts_Promise
    .then(transcripts => {
      return res.status(200).json(transcripts);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

TranscriptController.getTranscriptById = (req, res) => {
  let transcriptID = req.params.id;
  let getTranscriptById_Promise = TranscriptModel.findById(transcriptID).exec();

  getTranscriptById_Promise
    .then(transcript => {
      return transcript
        ? res.status(200).json(transcript)
        : res.status(404).json({
            error: `Can not find transcript with id: ${transcriptID}`
          });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

TranscriptController.getTranscriptByCourseId = (req, res) => {
  let courseID = req.params.id;
  let getTranscriptById_Promise = TranscriptModel.find({"courseID":`${courseID}`}).exec();

  getTranscriptById_Promise
    .then(transcript => {
      return transcript
        ? res.status(200).json(transcript)
        : res.status(404).json({
            error: `Can not find transcript with id: ${courseID}`
          });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};

// Updating transcripts.
TranscriptController.updateTranscriptById = (req, res) => {
  console.log(req.body);
  let transcriptID = req.params.id;
  let updateTranscriptById_Promise = TranscriptModel.findById(
    transcriptID
  ).exec();
  updateTranscriptById_Promise
    .then(transcript => {
      _.extend(transcript, req.body);
      return transcript.save();
    })
    .then(transcript => {
      return res.status(201).json(transcript);
    })
    .catch(err => {
      return res.status(500).json({ error: err.message });
    });
};

// Destroying Transcripts.
TranscriptController.destroyById = (req, res) => {
  let transcriptID = req.params.id;
  let findByIdAndRemove_Promise = TranscriptModel.findByIdAndRemove(
    transcriptID
  ).exec();

  findByIdAndRemove_Promise
    .then(transcript => {
      return transcript
        ? res.status(201).json(transcript)
        : res
            .status(404)
            .json({ error: `No transcript found with id: ${transcriptID}` });
    })
    .catch(err => {
      console.log("Error: " + err.message);
      return res.status(500).json({ error: err.message });
    });
};

module.exports = TranscriptController;
