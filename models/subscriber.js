"use strict";

const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
        },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
});


subscriberSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email}`;
};


module.exports = mongoose.model("Subscriber", subscriberSchema);