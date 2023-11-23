"use strict";

module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  }
};