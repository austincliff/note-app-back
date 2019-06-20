//Creates the app
const express = require('express');
const PORT = 3000;
const app = express('app');
const bodyParser = require('body-parser');

//Mongo Imports
const mongoose = require('mongoose');
const Note = require('./models/note');
const connectionString = 'mongodb://localhost:27017/notes';

//Required to send json in request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Initiate connection to db
mongoose.connect(connectionString, { useNewUrlParser: true }, () => {
    console.log(`Connection at ${connectionString} successful...`);
});

//API Version
const version = 'v1';
const apiUri = `/api/${version}`;

//GET NOTES
app.get(`${apiUri}/`, (req, res) => {
    Note.find({}).then(note => {
        res.json(note);
    });
});

//GET NOTE BY ID
app.get(`${apiUri}/getNoteById`, (req, res) => {
    Note.findById(req.body.id).then(note => {
        res.json(note);
    });
});

//GET NOTE BY TITLE
app.get(`${apiUri}/getNoteByTitle`, (req, res) => {
    Note.find({ title: req.body.title }).then(note => {
        res.json(note);
    });
});

//CREATE NOTE
app.post(`${apiUri}/createNote`, (req, res) => {
    Note.create(
        {
            "title": req.body.title, "description": req.body.description, "dateCreated": Date()
        }).then(note => {
            res.json(note);
        });
});

//UPDATE NOTE, seems to not be returning new note immediately
app.put(`${apiUri}/updateNote`, (req, res) => {
    Note.findByIdAndUpdate(req.body.id,
        {
            "title": req.body.title, "description": req.body.description
        }).then(note => {
            res.json(note);
        });
});

//DELETE NOTE
app.delete(`${apiUri}/deleteNote`, (req, res) => {
    Note.findByIdAndDelete(req.body.id).then(note => {
        res.json(note);
    });
});

//App listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));