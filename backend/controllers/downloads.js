"use strict";
const _ = require("underscore");
const TranscriptModel = require("../models/transcript");
const htmlToRtf = require('html-to-rtf');
const QuillDeltaToHtmlConverter = require('quill-delta-to-html');

let DownloadController = {};


DownloadController.getDelta = (req, res) => {

    let transcriptID = req.params.id;
    let getTranscriptById_Promise = TranscriptModel.findById(transcriptID).exec();
  
    getTranscriptById_Promise
      .then(transcript => {

        if(transcript) {
            console.log(transcript.captions.ops);
            const convertedDeltaOps = new QuillDeltaToHtmlConverter(transcript.captions.ops); // convert delto to html
            const html = convertedDeltaOps.convert();
            console.log(html);
            res.set({"Access-Control-Expose-Headers": `Content-Disposition`,"Content-Disposition":`attachment; filename=\"test.rtf\"`});
            let output = htmlToRtf.convertHtmlToRtf(html);

            res.send(output);

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
  