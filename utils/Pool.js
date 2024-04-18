

class Pool {
  constructor() {
    this.sockets = new Map();
  }

  formatClient({ addr, port }) {
    return `${addr} (${port})`;
  }

  add({ addr, port, socket }) {
    const client = this.formatClient({ addr, port });
    this.sockets.set(client, socket);
    return this;
  }

  remove({ addr, port }) {
    const client = this.formatClient({ addr, port });
    this.sockets.delete(client);
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

