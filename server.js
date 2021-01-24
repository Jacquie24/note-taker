// REQUIRE APIROUTES AND HTMLROUTES
// REQUIRE EXPRESS
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serves up static images
app.use(express.static('public'));

// ADDING IN API ROUTES
require("./routes/apiRoutes.js")(app);



// PULLING IN HTML ROUTES AND USING EXPRESS(WHICH IS THE APP VARIABLE)
require("./routes/htmlRoutes.js")(app);

  
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });