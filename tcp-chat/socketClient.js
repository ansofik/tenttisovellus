const net = require('net');
const readline = require('readline');

const port = 1337;
const host = '127.0.0.1';

const client = new net.Socket();
let rl = null;


client.connect(port, host, () => {
  console.log('Connected')

  rl = readline.createInterface(
    process.stdin, process.stdout);

  rl.setPrompt('>');

  rl.on('line', text => {
    if (!client.hasOwnProperty('username')) {
      client.username = text
    }
    client.write(text);
  })
});


client.on('data', data => {
  // clear the current output line
  readline.clearLine(process.stdout, 0)
  // move cursor to the beginning of the current output line
  readline.cursorTo(process.stdout, 0)
  const text = data.toString()
  if (text.startsWith(client.username)) {
    // move cursor up one line
    readline.moveCursor(process.stdout, 0, -1)
  }
  const promptIndex = text.indexOf('>')
  if (promptIndex !== -1) {
    console.log('\x1b[32m%s\x1b[0m%s', text.substring(0,promptIndex), text.substring(promptIndex) )
  } else {
    console.log(text);
  }
  // rl.prompt has parameter preserveCursor <boolean>
  rl.prompt(true)
});


client.on('close', () => {
  console.log('Connection closed');
});


client.on('error', err => {
  console.log('Error occurred ' + err);
})