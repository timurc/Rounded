const WebSocket = require('ws');

console.log(`

   –––––––––––––––––––––––––
  |                         |
  |           V**           |
  |                         |
  |   THE ROUNDED SERVER    |
  |  A VÖLLIG OHNE PROJECT  |
  |                         |
   –––––––––––––––––––––––––

`);

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
    ws.id = req.headers['sec-websocket-key'];
    console.log('connected 🎉', ws.id);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.on('close', function incoming(message) {
        console.log('closed :-/');
        updateClientCount();
    });
    updateClientCount();
});

function updateClientCount() {
    sendMessageToAllClients({ clientCount: wss.clients.size });
}

function sendMessageToAllClients(message) {
    wss.clients.forEach(client => client.send(JSON.stringify(message)));
}
