// updateSongFormRouter.js
const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');

// Route for rendering the update form
router.get('/:songId', async (req, res) => {
    const { songId } = req.params;

    try {
        const song = await songsController.getSongById(songId);
        res.render('updateSongForm', { song: song }); // Pass the song object to the template
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
