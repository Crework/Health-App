const express = require("express");
const { spawn } = require("child_process");
const mongoose = require("mongoose");
const Journal = require("../models/JournalSchema");
const User = require("../models/UserSchema");

const router = express.Router();

router.get("/:userId/get-all", async (req, res, next) => {
  const userId = req.params.userId;
  const journals = await Journal.find({ createdBy: userId }).exec();
  if (journals && journals.length > 0) {
    return res.json({ journals });
  }
  return res.json({ error: "No Journals found!" });
});

router.post("/:userId/add-one", async (req, res, next) => {
  const content = req.body.content;
  const userId = req.params.userId;
  const process = spawn("python3", ["./ML/ML.py", content]);
  let needData = true;
  process.stdout.on("data", async (data) => {
    needData = false;
    const newlyAddedJournal = new Journal({
        content, 
        createdBy: mongoose.Types.ObjectId(userId),
        moodResult: data
    });
    await newlyAddedJournal.save();

    try{
      User.findOne({_id: userId}, async function(err, foundUser){
        if(err){
          console.log(err);
          res.status(500).send();
        }else {
          if(!foundUser){
            res.status(404).send();
          }else{
            foundUser.journals = [...foundUser.journals, mongoose.Types.ObjectId(newlyAddedJournal._id)];
            console.log(foundUser);
            await foundUser.save();
          }
        }
     })
    }catch(error) {
      console.log("editing error", error);
    }


    return res.json({newlyAddedJournal});
  });

  if (!needData) res.send("Error happened");
});

router.put("/:journalId/edit-one/", async (req, res) => {
  const content = req.body.content;
  const journalId = req.params.journalId;
  try{
    Journal.findOne({_id: journalId}, function(err, foundJournal){
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
            foundJournal.content = content;
            foundJournal.moodResult = data;
            await foundJournal.save();
            return res.json({foundJournal});
          });
        }
      }
   })
  }catch(error) {
    console.log("editing error", error);
  }
});

router.get("/:journalId/get-one/", async (req, res) => {
  const journalId = req.params.journalId;
  try{
    Journal.findOne({_id: journalId}, function(err, foundJournal){
      if(err){
        console.log(err);
        res.status(500).send();
      }else {
        if(!foundJournal){
          res.status(404).send();
        }else{
          return res.json({foundJournal});
        }
      }
   })
  }catch(error) {
    console.log("Journal finding error", error);
  }
});


module.exports = router;