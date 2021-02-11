const express = require("express");
const User = require("../models/UserSchema");

const router = express.Router();

router.post("/add-new", async (req, res) => {
    const { name, email, dateOfBirth, profilePicture, journals } = req.body;
  try {
    const newlyAddedUser = new User({
      name,
      email,
      dateOfBirth,
      profilePicture,
      journals,
    });
    await newlyAddedUser.save();
    res.json({newlyAddedUser});
  } catch (error) {
      console.log(error);
  }
});

router.get("/get-all", async (req, res) => {
    try {
        const users = await User.find().exec();
        res.json({users});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
