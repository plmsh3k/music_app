"use strict";

const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  duration: {
    type: Number,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model("Song", songSchema);