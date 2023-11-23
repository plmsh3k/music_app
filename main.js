"use strict";

const express = require("express"),
  app = express(),
  router = express.Router(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController"),
  artistsController = require("./controllers/artistsController");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/music_db",
);


const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(
    express.urlencoded({
      extended: false
    })
);
  

router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

router.use(express.json());
router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/artists", artistsController.index, artistsController.indexView);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);


app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});