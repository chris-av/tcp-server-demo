const net = require('net');
const port = process.env.PORT || 7070;

const sockets = new Map();

const server = net.createServer(function(socket) {
  const { remoteAddress: addr, remotePort: port } = socket;
  const client = `${addr} (${port})`;
  let date = new Date().toLocaleString();
  console.log(`${date} CONNECTION : ${client})`);
  sockets.set(client, socket);
  socket.on('data', function(data) {
    let date = new Date().toLocaleString();
    console.log(`${date} DATA : ${addr} (${port})`);
    for (const s of sockets.values()) {
      if (s === socket) { continue; }
      s.write(`${client} : ${data.toString()}`);
    }
  });
  socket.on('close', function() {
    sockets.delete(client);
    console.log(`${date} CLOSED CONNECTION : ${client})`);
  });
});

server.on("error", function(err) {
  throw err;
});

server.listen(port, function() {
  console.log('launching tcp server on port ' + port + ' ... ');
});

