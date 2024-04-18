const net = require('net');
const PORT = process.env.PORT || 7070;
const pool = require("../utils/Pool");

const server = net.createServer(function(socket) {
  const { remoteAddress: addr, remotePort: port } = socket;
  pool.add(socket);
  const client = `${addr} (${port})`;
  let date = new Date().toLocaleString();
  console.log(`${date} CONNECTION : ${client})`);
  socket.on('data', function(data) {
    let date = new Date().toLocaleString();
    console.log(`${date} DATA : ${addr} (${port})`);
    const msg = data.toString();
    pool.broadcast(msg, socket);
  });
  socket.on('close', function() {
    pool.remove(socket);
    console.log(`${date} CLOSED CONNECTION : ${client})`);
  });
});

server.on("error", function(err) {
  throw err;
});

server.listen(PORT, function() {
  console.log('launching tcp server on port ' + PORT + ' ... ');
});

