const net = require('net');
const port = process.env.PORT || 7070;

let sockets = [];

const server = net.createServer(function(socket) {
  const { remoteAddress: addr, remotePort: port } = socket;
  const client = `${addr} (${port})`;
  let date = new Date().toLocaleString();
  console.log(`${date} CONNECTION : ${client})`);
  sockets.push(socket);
  socket.on('data', function(data) {
    let date = new Date().toLocaleString();
    console.log(`${date} DATA : ${addr} (${port})`);
    for (let i = 0; i < sockets.length; i++) {
      if (sockets[i] === socket) continue;
      sockets[i].write(`${client}) : ${data}`);
    }
  });
  socket.on('close', function() {
    let index = sockets.indexOf(socket);
    let date = new Date().toLocaleString();
    sockets.splice(index, 1);
    console.log(`${date} CLOSED CONNECTION : ${client})`);
  });
});

server.on("error", function(err) {
  throw err;
});

server.listen(port, function() {
  console.log('launching tcp server on port ' + port + ' ... ');
});

