// /API ROUTES AND DATA FROM DB FILE
// USING FUNCTIONS WE DEFINE IN STORE
// const router = require("express").Router();
// const store = require("../DB/store.js");
const fs = require("fs");
var noteData = require("../DB/db.json");
// Get Route to read and display from JSON db

module.exports = (app) => {

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Post Route to save new note to JSON db
app.post("/api/notes", function (req, res) {
    // Declare empty array for current and new notes
    let savedNotes = [];

    // Read currently stored notes list
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        // Parse currently stored notes
        const currentNoteData = JSON.parse(data);

        for (let i = 0; i < currentNoteData.length; i++) {
            // Create new note object for each current note
            const note = {
                title: currentNoteData[i].title,
                text: currentNoteData[i].text,
                id: i,
            };

            // Add note object to array
            savedNotes.push(note);
        }

        // Create new note object for new note
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: savedNotes.length,
        };

        // Push new note into array
        savedNotes.push(newNote);

        // Stringify savedNotes array
        savedNotes = JSON.stringify(savedNotes);

        fs.writeFile("./db/db.json", savedNotes, (err) => {
            if (err) throw err;
            console.log("File saved successfully.");
        });

        // Send a response to resolve the post request
        res.send("Note added successfully.");
    });
});


// Delete Route to delete stored notes
app.delete("/api/notes/:id", function (req, res) {
    // Capture clicked Note ID
    const noteID = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        // Parse currently stored notes
        const currentNoteData = JSON.parse(data);

        // Delete clicked note
        currentNoteData.splice(noteID, 1);

        // Stringify data
        updatedData = JSON.stringify(currentNoteData);

        // Write data back to stored db.json
        fs.writeFile("./db/db.json", updatedData, (err) => {
            if (err) throw err;
        });

        res.send("Note deleted succesfully.");
    });
});
};

// router.get api/notes... use store function