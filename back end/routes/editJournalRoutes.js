const express = require("express");
const { spawn } = require("child_process");
const mongoose = require("mongoose");
const Journal = require("../models/JournalSchema");

const router = express.Router();

router.put("/:journalId/edit-one/", async (req, res, next) => {
  const content = req.body.content;
  const journalId = req.params.journalId;
  Journal.findOne({_id: id}, function(err, foundJournal){
    if(err){
      console.log(err);
      res.status(500).send();
    }else {
      if(!foundJournal){
        res.status(404).send();
      }else{
        const process = spawn("python3", ["./ML/ML.py", content]);
        let needData = true;
        process.stdout.on("data", async (data) => {
          needData = false;
          foundJournal.content = req.body.content;
          foundJournal.moodResult = data;
          await foundJournal.save();
          return res.json({newlyAddedJournal});
        });
      }
    }
  })
});

module.exports = router;