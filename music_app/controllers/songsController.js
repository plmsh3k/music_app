const Song = require("../models/song");

const getAllSongs = async () => {
    try {
        const songs = await Song.find({});
        return songs;
    } catch (error) {
        throw new Error("Unable to fetch songs");
    }
};

const updateSongInfo = async (songId, updatedInfo) => {
    try {
        const song = await Song.findById(songId);
        if (!song) {
            throw new Error("Song not found");
        }

        const updatedSong = await song.updateInfo(updatedInfo);
        return updatedSong;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getSongById = async (songId) => {
    try {
        const song = await Song.findById(songId);
        if (!song) {
            throw new Error("Song not found");
        }
        return song;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllSongs,
    updateSongInfo,
    getSongById 
}