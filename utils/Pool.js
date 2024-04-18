class Pool {
  constructor() {
    this.sockets = new Map();
  }

  formatClient(socket) {
    const { remoteAddress: addr, remotePort: port } = socket;
    return `${addr} (${port})`;
  }

  add(socket) {
    const client = this.formatClient(socket);
    this.sockets.set(client, socket);
    return this;
  }

  remove(socket) {
    const client = this.formatClient(socket);
    this.sockets.delete(client);
    return this;
  }

  broadcast(msg, socket) {
    const client = this.formatClient(socket);
    for (const peer of this.sockets.values()) {
      if (socket === peer) { continue; }
      peer.write(`${client} : ${msg}`);
    }
    return this;
  }

  list() {
    for (const client of this.sockets.keys()) {
      console.log("client : " + client);
    }
    return this;
  }

}

const pool = new Pool();
module.exports = pool;

