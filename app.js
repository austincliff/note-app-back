//Creates the app
const express = require('express');
const PORT = 3000;
const app = express('app');

//Required to send json in request body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Mock data
let notes = require('./notes');

//API Version
const version = 'v1';
const apiUri = `/api/${version}`;

//GET NOTES
app.get(`${apiUri}/getNotes`, (req, res) => {
    res.send(notes);
});

//GET NOTE BY ID
app.get(`${apiUri}/getNoteById/:noteId`, (req, res) => {
    let id = req.params.noteId;
    if (!notes[id] == id) {
        console.log('Note with the specified id does not exist')
        res.send(notes)
    } else {
        let noteToSend = notes.filter(note => (note.noteId == id));
        res.send(noteToSend);
    }
});

//GET NOTE BY TITLE
app.get(`${apiUri}/getNoteByTitle/:title`, (req, res) => {
    let title = req.params.title;
    let noteToSend = notes.filter(note => (note.title == title));
    res.send(noteToSend);
});

//CREATE NOTE
app.post(`${apiUri}/createNote`, (req, res) => {
    notes.push(req.body);
    res.sendStatus(200);
});

//UPDATE NOTE USE 
/*
indexOf is problematic for this use case, use findIndex
*/
app.put(`${apiUri}/updateNote/:noteId`, (req, res) => {
    let id = req.params.noteId;
    let i = notes.findIndex(note => note.noteId == id);
    notes.splice(i,1,req.body);
    console.log(i);
    res.sendStatus(200);
});

//DELETE NOTE
app.delete(`${apiUri}/deleteNote/:noteId`, (req, res) => {
    let id = req.params.noteId;
    notes = notes.filter(note => (note.noteId != id));
    console.log(notes);
    res.sendStatus(200);
});

//App listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));