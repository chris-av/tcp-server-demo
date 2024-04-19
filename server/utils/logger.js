module.exports = function({
  type,
  message,
  stream = null,
}) {
  const date = new Date().toLocaleString();
  const log = `${date} ${type} ${message}`;
  console.log(log);
  if (stream) {
    stream.write(log + "\n");
    if (type === "ERROR" || type === "CLOSE") {
      stream.close();
    }
  }
  return;
}
