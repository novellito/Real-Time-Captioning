"use strict";
const TranscriptModel = require("../models/transcript");
const htmlToRtf = require('html-to-rtf');
const QuillDeltaToHtmlConverter = require('quill-delta-to-html');

let DownloadController = {};


DownloadController.getRTF = (req, res) => {

    let transcriptID = req.params.id;
    let getTranscriptById_Promise = TranscriptModel.findById(transcriptID).exec();
  
    getTranscriptById_Promise
      .then(transcript => {

        if(transcript) {
            const convertedDeltaOps = new QuillDeltaToHtmlConverter(transcript.captions.ops); 
            const html = convertedDeltaOps.convert(); // convert delto to html
            const rtfElem = htmlToRtf.convertHtmlToRtf(html);
            res.send(rtfElem);
        } else {            
             res.status(404).json({
                error: `Can not find transcript with id: ${transcriptID}`
            });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  };


  module.exports = DownloadController;
  