const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    idEvent: {
        type: Number,
        required: true,
        unique: true,
        index: true, 
        trim: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema);