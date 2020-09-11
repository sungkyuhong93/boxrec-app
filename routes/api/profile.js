const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fileUpload = require("../../middleware/file-upload");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// get api/profile/me
// get current users profile
// private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile for this user",
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// post api/profile
// create or update users profile
// private

router.post(
  "/",
  [
    auth,
    fileUpload.single("image"),
    [
      check("wins", "Wins is required").not().isEmpty(),
      check("losses", "Losses is required").not().isEmpty(),
      check("kos", "KOs is required").not().isEmpty(),
      check("dob", "Date of Birth is required").not().isEmpty(),
      check("birthPlace", "Birth Place is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { wins, losses, draws, kos, dob, birthPlace } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.image = req.file.path;

    if (wins) profileFields.wins = wins;
    if (losses) profileFields.losses = losses;
    if (draws) profileFields.draws = draws;
    if (kos) profileFields.kos = kos;
    if (dob) profileFields.dob = dob;
    if (birthPlace) profileFields.birthPlace = birthPlace;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id,
          },
          {
            $set: profileFields,
          },
          {
            new: true,
          }
        );

        return res.json(profile);
      }

      // create
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
      console.log(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// get api/profile
// get all profiles
// public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
});

// get api/profile/user/:user_id
// get profile by id
// public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        msg: "Profile not found",
      });
    }
    res.status(500).send("Server Error");
  }
});

// delete api/profile
// delete profile,user
// private
router.delete("/", auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });

    await User.findOneAndRemove({
      _id: req.user.id,
    });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
