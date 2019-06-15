//Creates the app
const express = require('express');
const PORT = 3000;
const app = express('app');

//Require note, 
const note = require('./note.json');

//API Version
const version = 'v1';
const apiUri = `/api/${version}`;

//GET NOTE
app.get(`${apiUri}/getNote`, (req, res) => {
    res.send(note);
    res.status(200, 'OK');
});

//App listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));