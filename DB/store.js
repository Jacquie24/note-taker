// USING UTIL AND FS TO READ AND WRITE TO DB.JSON
const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store{
    // DEFINE FUNCTIONS TO READ AND WRITE TO DB.JSON
}
module.exports = new Store();