const express = require("express");
const { spawn } = require("child_process");
const mongoose = require("mongoose");
const Journal = require("../models/JournalSchema");

const router = express.Router();

router.get("/:userId/get-all", async (req, res, next) => {
  const userId = req.params.userId;
  const journals = await Journal.find({ createdBy: userId }).exec();
  if (journals && journals.length > 0) {
    return res.json({ journals });
  }
  return res.json({ error: "No Journals found!" });
});

router.post("/:userId/add-one/", async (req, res, next) => {
  const content = req.body.content;
  const userId = req.params.userId;
  const process = spawn("python", ["./ML/ML.py", content]);
  let needData = true;
  process.stdout.on("data", async (data) => {
    needData = false;
    const newlyAddedJournal = new Journal({
        content, 
        createdBy: mongoose.Types.ObjectId(userId),
        moodResult: data
    });
    await newlyAddedJournal.save();
    return res.json({newlyAddedJournal});
  });

  if (!needData) res.send("Error happened");
});

module.exports = router;