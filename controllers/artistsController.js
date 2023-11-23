"use strict";

const Artist = require("../models/artist");

module.exports = {
    index: (req, res, next) => {
        Artist.find({})
        .then(artists => {
          res.locals.artists = artists;
          next();
        })
        .catch(error => {
          console.log(`Error fetching courses: ${error.message}`);
          next(error);
        });
    },
    indexView: (req, res) => {
      res.render("artists/index");
    }
};