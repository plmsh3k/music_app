// updateSong.js
const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');

// Route for updating song information
router.post('/:songId', async (req, res) => {
    const { songId } = req.params;
    const { updatedInfo } = req.body;

    try {
        const updatedSong = await songsController.updateSongInfo(songId, updatedInfo);
        // Redirect to the songs page after successful update
        res.redirect('/songs');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

