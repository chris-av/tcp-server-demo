const fs = require("fs");
const paths = require("../paths");

module.exports = function({
  type,
  message,
}) {
  const { log: logpath } = paths;
  const date = new Date().toLocaleString();
  const log = `${date} ${type} ${message}`;
  console.log(log);
  fs.appendFileSync(logpath, log + "\n");
  return;
}
