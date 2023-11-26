const mongoose = require("mongoose");
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const songsController = require('./controllers/songsController');
const updateSong = require('./routes/updateSong');
const app = express();
const Song = require("./models/song");
const updateSongForm = require('./routes/updateSongForm');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = mongoose.connection;
mongoose.connect("mongodb://127.0.0.1:27017/music_db", { useNewUrlParser: true });

db.once('open', async () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.route("/")
    .get((req, res) => {
        res.render("homepage");
    })
    .post((req, res) => {
        // Handle POST requests if needed
        res.render("homepage");
    });

app.route("/songs")
  .get(async (req, res) => {
    try {
      const songs = await songsController.getAllSongs();
      res.render('songs', { songs: songs });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  })
  .post(async (req, res) => {
    try {
        // Extract song information from the request body
      const { name, artist, genre, releaseDate, duration, album, rate, lyric, video } = req.body;
  
        // Create a new song
      const newSong = new Song({
        name,
        artist,
        genre,
        releaseDate,
        duration,
        album,
        rate,
        lyric,
        video
      });
  
        // Save the new song to the database
      await newSong.save();
  
        // Redirect to the songs page after adding the song
      res.redirect('/songs');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  

app.get('/songs/add', (req, res) => {
  res.render('addSong');
});

app.use('/updateSong', updateSong);
app.use('/updateSongForm', updateSongForm);

app.get('/updateSongForm', (req, res) => {
  res.render('updateSongForm');
});

app.route('/songs/:id')
  .get(async (req, res) => {
    try {
      const song = await songsController.getSongById(req.params.id);
      res.render('updateSongForm', { song: song });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  })
  .post(async (req, res) => {
    try {
      const songId = req.params.id;
      const updatedInfo = req.body.updatedInfo;

      await songsController.updateSongInfo(songId, updatedInfo);

      res.redirect('/songs');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

