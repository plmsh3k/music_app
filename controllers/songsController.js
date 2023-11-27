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
            duration: req.body.duration,
            updatedBy: req.user._id
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
    },
    edit: (req, res, next) => {
      let songId = req.params.id;
      Song.findById(songId)
        .then(song => {
          res.render("songs/edit", {
            song: song
          });
        })
        .catch(error => {
          console.log(`Error fetching course by ID: ${error.message}`);
          next(error);
        });
    },
    update: (req, res, next) => {
      let songId = req.params.id,
        songParams = {
          name: req.body.name,
          artist: req.body.artist,
          rating: req.body.rating,
          duration: req.body.duration
        };
  
      Song.findByIdAndUpdate(songId, {
        $set: {
            ...songParams,
            updatedAt: Date.now(),
            updatedBy: req.user._id}
      })
        .then(song => {
          res.locals.redirect = `/songs/${songId}`;
          res.locals.song = song;
          next();
        })
        .catch(error => {
          console.log(`Error updating course by ID: ${error.message}`);
          next(error);
        });
    },

    delete: (req, res, next) => {
      let songId = req.params.id;
    
      Song.findOneAndDelete({ _id: songId })
        .then(() => {
          res.locals.redirect = "/songs";
          next();
        })
        .catch(error => {
          console.log(`Error deleting song by ID: ${error.message}`);
          next();
        });
    },

    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect;
      if (redirectPath !== undefined) res.redirect(redirectPath);
      else next();
    },

    show: (req, res, next) => {
      let songId = req.params.id;
      Song.findById(songId).populate('updatedBy')
        .then(song => {
          res.locals.song = song;
          next();
        })
        .catch(error => {
          console.log(`Error fetching course by ID: ${error.message}`);
          next(error);
        });
    },
  
    showView: (req, res) => {
      res.render("songs/show");
    }
};