const mongoose = require('mongoose'),
    {Schema} = mongoose
    

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    artist: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    },
    releaseDate: {
        type: Date,
    },
    duration: {
        type: Number,
    },    
    album: {
        type: String
    },
    lyric: {
        type: String
    },
    video: {
        type: String,
        validate: {
            validator: function (v) {
                // Simple URL validation using a regular expression
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

songSchema.methods.getInfo = function() {
    return `Name: ${this.name} Artist: ${this.artist} Album: ${this.album} Lyric:  ${this.lyric} `;
};

songSchema.methods.updateInfo = async function(updatedInfo) {
    try {
        // Update the song information
        Object.assign(this, updatedInfo);
        await this.save();
        return this;
    } catch (error) {
        throw new Error("Unable to update song information");
    }
};



module.exports = mongoose.model("Song", songSchema);