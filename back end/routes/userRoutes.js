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
      console.log("user route error", error);
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

router.put("/:userID/edit-user", async (req, res) => {
  const UserId = req.params.UserId;
  try{
    User.findOne({_id: UserId}, async function(err, foundUser){

      if(err){
        console.log(err);
        res.status(500).send();
      }else {
        if(!foundUser){
          res.status(404).send();
        }else{
          if(req.body.email){
            foundUser.email = email;
          }
          if(req.body.name){
            foundUser.name = name;
          }
          console.log(foundUser);
          await foundUser.save();
          return res.json({foundUser});
        }
      }

    })
  }catch(error) {
    console.log("editing user profile error : ", error);
  }
});

module.exports = router;
