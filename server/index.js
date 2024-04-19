const net = require('net');
const PORT = process.env.PORT || 7070;
const pool = require("./utils/Pool");
const logger = require("./utils/logger");
const getStream = require("./utils/use-stream");
const stream = getStream();

const server = net.createServer(function(socket) {
  const { remoteAddress: addr, remotePort: port } = socket;
  pool.add(socket);
  const client = `${addr} (${port})`;
  logger({
    type: "CONNECTION",
    message: `client ${client} connected`,
    stream,
  });
  socket.on('data', function(data) {
    let date = new Date().toLocaleString();
    const msg = data.toString();
    logger({
      type: "DATA",
      message: `${client} : ${msg}`,
      stream,
    });
    pool.broadcast(msg, socket);
  });
  socket.on('close', function() {
    pool.remove(socket);
    logger({
      type: "DISCONNECT",
      message: client,
      stream,
    });
  });
});

server.on("error", function(err) {
  logger({
    type: "ERROR",
    message: err,
    stream,
  })
  throw err;
});

server.on("close", function() {
  logger({
    type: "CLOSE",
    message: "closing server",
    stream,
  })
  throw err;
});

server.listen(PORT, function() {
  console.log('launching tcp server on port ' + PORT + ' ... ');
});

