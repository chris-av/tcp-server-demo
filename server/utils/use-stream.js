const fs = require("fs");
const path = require("path");
const paths = require("../paths");

module.exports = function() {
  const logdir = path.dirname(paths.log);
  if (!fs.existsSync(logdir)) {
    // create the directory
    console.log("could not find " + logdir);
    console.log("creating dir " + logdir);
    fs.mkdirSync(logdir);
  }

  // at this point, we should have the directory
  // createWriteStream will create the file if it doesn't exist
  const stream = fs.createWriteStream(paths.log);
  return stream;
}

