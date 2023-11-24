"use strict";

const Song = require("../models/song");

module.exports = {
    index: (req, res, next) => {
        Song.find({})
        .then(songs => {
          res.locals.songs = songs;
          next();
        })
        .catch(error => {
          console.log(`Error fetching courses: ${error.message}`);
          next(error);
        });
    },
    indexView: (req, res) => {
      res.render("songs/index");
    },
    new: (req, res) => {
        res.render("songs/new");
    },
    create: (req, res, next) => {
        let songParams = {
            name: req.body.name,
            artist: req.body.artist,
            rating: req.body.rating,
            duration: req.body.duration
        };
        Song.create(songParams)
          .then(song => {
            res.locals.redirect = "/songs";
            res.locals.song = song;
            next();
          })
          .catch(error => {
            console.log(`Error saving course: ${error.message}`);
            next(error);
          });
      },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    }
};