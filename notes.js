const note = require('./note');

let noteOne = new note(1, Date(), 'MyFirstNote', 'Wow cool this is the first time Ive ever created a note on this sick new note taking app');
let noteTwo = new note(2, Date(), 'My Second Note', 'Ehh this is the second time Ive created a note');
let noteThree = new note(3, Date(), 'My Third Note', 'i dont read these things anyway');

let notes = [noteOne, noteTwo, noteThree];

module.exports = notes;