const net = require('net');

const port = 1337;
const host = '127.0.0.1';

let sockets = []

const server = net.createServer(socket => {
  console.log(`Connected: adress ${socket.remoteAddress}, port ${socket.remotePort}`);
  socket.write('Welcome to the chat!\nPlease enter a username.')
  sockets.push(socket)

  socket.on('data', data => {
    console.log(`Received data from ${socket.remoteAddress}, port ${socket.remotePort}: ${data}`);
    console.log('Connected users:' + sockets.length)

    if (data.toString().toLowerCase() === 'quit') {
      socket.destroy()
    }

    clearTimeout(socket.timeoutId)

    // close the connection if no messages for 5 minutes
    socket.timeoutId = setTimeout(() => {
      console.log('Timeout')
      socket.destroy()
    }, 300000)

    if (!socket.username) {
      socket.username = data.toString()
      socket.write(`Hello ${socket.username}!`)
      broadcast(`User ${socket.username} joined the chat`, socket)
    } else {
      sockets.forEach(s => s.write(socket.username + "> " + data));
    }
  });

  socket.on('error', err => {
    console.log('Error:' + err);
  });

  socket.on('close', () => {
    console.log(`Connection closed: ${socket.remoteAddress}, ${socket.remotePort}`);
    broadcast(`User ${socket.username} left the chat`, socket)
    sockets.splice(sockets.indexOf(socket), 1);
  });
});


server.listen(port, host, () => {
  console.log('TCP server running on port ' + port);
});


const broadcast = (msg, sender) => {
  sockets.forEach(socket => {
    if (socket !== sender) {
      socket.write(msg);
    }
  });
}
