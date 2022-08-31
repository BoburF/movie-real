const { Schema, model } = require('mongoose')

const moviesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    genre: [
        {
            type: String,
            required: true
        }
    ],
    related: {
        type: Number,
        required: true
    },
    top: {
        type: Number,
        required: true
    }
})

module.exports = model('movies', moviesSchema)