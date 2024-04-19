const net = require('net');
const PORT = process.env.PORT || 7070;
const pool = require("./utils/Pool");
const logger = require("./utils/logger");

const server = net.createServer(function(socket) {
  const { remoteAddress: addr, remotePort: port } = socket;
  pool.add(socket);
  const client = `${addr} (${port})`;
  logger({
    type: "CONNECTION",
    message: `client ${client} connected`
  });
  socket.on('data', function(data) {
    let date = new Date().toLocaleString();
    console.log(`${date} DATA : ${addr} (${port})`);
    logger({
      type: "DATA",
      message: `${client} : ${data.toString()}`,
    });
    const msg = data.toString();
    pool.broadcast(msg, socket);
  });
  socket.on('close', function() {
    pool.remove(socket);
    logger({
      type: "DISCONNECT",
      message: client,
    })
  });
});

server.on("error", function(err) {
  throw err;
});

server.listen(PORT, function() {
  console.log('launching tcp server on port ' + PORT + ' ... ');
});

