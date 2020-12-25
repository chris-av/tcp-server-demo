const readline = require('readline');
const net = require('net');
const options = { port: 7070 };

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function iprompt(iclient) {
  rl.question('write message : ', function(data) {
    if (data === 'exit')  {
      rl.close();
      client.end();
    }
    else {
      iclient.write(data);
      iprompt(iclient);
    }
  });
}

const client = net.connect(options, function() {
  client.write('hello!');
  iprompt(client);
});

client.on('data', function(data) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(data.toString());
  iprompt(client);
});

client.on('close', function() {
  console.log('disconnecting!');
  rl.close();
});
