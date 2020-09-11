const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  image: {
    type: String,
    required: true,
  },
  wins: {
    type: String,
    required: true,
  },
  losses: {
    type: String,
    required: true,
  },
  draws: {
    type: String,
    required: true,
  },
  kos: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  birthPlace: {
    type: String,
    required: true,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
