// /API ROUTES AND DATA FROM DB FILE
// USING FUNCTIONS WE DEFINE IN STORE
// const router = require("express").Router();
// const store = require("../DB/store.js");

const fs = require("fs");
const dbJSON = require("../DB/db.json");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
// Get Route to read and display from JSON db

module.exports = (app) => {

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../DB/db.json"));
});

// Post Route to save new note to JSON db
app.post("/api/notes", function (req, res) {

    // Read currently stored notes list
    fs.readFile("./DB/db.json", "utf8", (err, data) => {
        if (err) throw err;

        // Parse currently stored notes
        let noteData = JSON.parse(data);
        // Note to save on the request body
        let noteBody = req.body;
        // Give the note a unique id
        noteBody.id = uuidv4();
        // Add to note data
        noteData.push(noteBody);
        // Return to a string
        let noteString = JSON.stringify(noteData);


        // Write to db file
        fs.writeFile("./DB/db.json", noteString, (err) => {
            if (err) throw err;
            console.log("Note saved.");
        });

        res.send("The note was successfully added.");
    });
});


// Delete Route to delete stored notes
app.delete("/api/notes/:id", function (req, res) {

    // Retrieving unique id
    const noteID = req.params.id;

    fs.readFile("./DB/db.json", "utf8", (err, data) => {
        if (err) throw err;

        // Parse note data
        const parseData = JSON.parse(data);

        // Delete clicked note
        
        const delNoteData = parseData.filter((note) => note.id !== noteID); 

        // Stringify data
        newNoteData = JSON.stringify(delNoteData);

        // Write data back to stored db.json
        fs.writeFile("./DB/db.json", newNoteData, (err) => {
            if (err) throw err;
        });

        console.log("note deleted");

        res.send("The note was successfully deleted.");
    });
});
};
