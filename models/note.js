const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String
    },
    dateCreated: {
        type: String
    },

});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;