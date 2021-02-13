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
  let needData = true;

  const process = spawn("python3", ["./ML/paragraph.py", content]);
  process.stdout.on("data", async (data) => {
    console.log(data.toString());
    needData = false;
    const newlyAddedJournal = new Journal({
        content, 
        createdBy: mongoose.Types.ObjectId(userId),
        moodResult: {"happy" : parseFloat(data.toString())}
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

  process.stderr.on( 'data', (data)=>{
    console.log(data.toString());
  } )

  process.on('close', (code) => {
    console.log("closed");
  })

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
          const process = spawn("python3", ["./ML/paragraph.py", content]);
          let needData = true;
          process.stdout.on("data", async (data) => {
            needData = false;
            foundJournal.content = content;
            foundJournal.moodResult = {"happy":parseFloat(data.toString())};
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

router.post("/create-word-cloud", async (req, res) => {
  const content = req.body.content;
  const fileName = req.body.fileName;
  try{
    const process = spawn("python3", ["./word cloud/wordcloud_for_journal.py", content, fileName]);
    let needData = true;
    process.stdout.on("data", async (data) => {
      needData = false;
      return res.json();
    })
    process.on('close', code => res.json({"code": code.toString()}));

  } catch(error){
    console.error();
  }
})


module.exports = router;