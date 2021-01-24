// RES.SENDFILE -- STAR WARS APP
const path = require("path");

module.exports = function (app) {

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });


    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // If the user types in any URL other than /tables or /reserve, send them to the home page
    // app.use("/", (req, res) => {
    //     res.sendFile(path.join(__dirname + "../public/home.html"));
    // });

}