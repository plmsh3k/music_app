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
  passport = require('passport'),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController"),
  songsController = require("./controllers/songsController"),
  subscribersController = require("./controllers/subscribersController"),
  User = require("./models/user");

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

router.use(express.static("public"));
router.use(layouts);
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
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
  secret: "secret-passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash())

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.get("/users/logout", usersController.logout)

router.get("/songs", songsController.index, songsController.indexView);
router.get("/songs/new", songsController.new);
router.post("/songs/create", songsController.create, songsController.redirectView);

router.get("/songs/:id/edit", songsController.edit);
router.put("/songs/:id/update", songsController.update, songsController.redirectView);
router.delete("/songs/:id/delete", songsController.delete, songsController.redirectView);
router.get("/songs/:id", songsController.show, songsController.showView);


router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);


router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);

router.post("/subscribe", subscribersController.saveSubscriber);


router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);


app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
