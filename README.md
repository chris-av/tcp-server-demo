# TCP Server Demo

## Introduction

This is my implementation of a TCP server with heavy inspiration from [this](https://www.section.io/engineering-education/tcp-node/) article and [this]() talk by one of the creators of NodeJS, Ryan Dahl. 

This implementation mimics a live chat server using a live TCP server. Code illustrates how to handle new and closing sockets, logging data, and adding features on the client side.

## Instructions

Run the server by entering the following command in your computer's terminal: 

```
node server.js
```

This will launch the TCP server. If your computer has `telnet` installed, you can establish a generic connection, which will send the data stream to the server as well as any other connected client. 

In the project directory is also a `client.js`, which connects to the TCP server. This client has a continual prompt that is more user friendly, and mimics a live chat service. To use this client, run:

```
node client.js
```

I have the `nodemon` package registered in my `package.json` file just in case you'd like to work on the server while it is up and running. Just run `npm install` at the project root directory.

## What is TCP?

TCP stands for Transmission Control Protocol. It is a protocol that describes how to establish a *reliable* connection (meaning, that both messengers will be reasonably certain that the communication is reliable, and if there any issues arises, this protocol has a way of letting one or both messengers know). The protocol is defined by the following features : 

* A two way connection stream between two machines
* a "handshake" that includes the initial request, a response confirming the request, and transmission of the data itself
* streaming data in packets, which itself contains metadata (headers) that describe how the packets should be assembled and in what order

TCP is a network level protocol that describes how machines should communicate data. Other protocols, such as HTTP (Hypertext Transfer Protocol) rely on TCP to know that more sophisticated, application-level data is being properly communicated.

# Notes

* [This](https://www.section.io/engineering-education/tcp-node/) tutorial inspired me to use a readline interface on the client side.
* [This](https://www.youtube.com/watch?v=jo_B4LTHi3I&t=2118s) talk by Ryan Dahl shows how to manage sockets, and how to safely remove them from the pool. Also learned how to prevent echo of data stream to the same client.
