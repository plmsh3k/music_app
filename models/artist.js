"use strict";

const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true
  },
  nameofsongs: [],
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model("Artist", artistSchema);