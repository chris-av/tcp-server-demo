const net = require('net');
const port = process.env.PORT || 7070;

let sockets = [];

const server = net.createServer(function(socket) {
  const { remoteAddress, remotePort } = socket;
  let date = new Date().toLocaleString();
  console.log(`CONNECTION : ${remoteAddress} (${remotePort}) ${date}`);
  sockets.push(socket);
  socket.on('data', function(data) {
    let date = new Date().toLocaleString();
    console.log(`DATA : ${remoteAddress} (${remotePort}) ${date}`);
    for (let i = 0; i < sockets.length; i++) {
      if (sockets[i] === socket) continue;
      sockets[i].write(`${remoteAddress} (${remotePort}) : ${data}`);
    }
  });
  socket.on('close', function() {
    let index = sockets.indexOf(socket);
    let date = new Date().toLocaleString();
    sockets.splice(index, 1);
    console.log(`CLOSED CONNECTION : ${remoteAddress} (${remotePort}) ${date}`);
  });
});

server.listen(port, function() {
  console.log('launching tcp server on port ' + port + ' ... ');
});

