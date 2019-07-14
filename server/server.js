const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
    console.log('connected 🎉', req.headers['sec-websocket-key']);
    ws.id = req.headers['sec-websocket-key'];

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.on('close', function incoming(message) {
        console.log('closed :-/');
        updateClientCount();
    });
    updateClientCount();
    ws.send('something');
});

// const interval = setInterval(function ping() {
//     // console.log(wss.clients);
//     console.log('---');
//     console.log('no of clients: ', wss.clients.size);
//     wss.clients.forEach(client => console.log(client.id));
// }, 3000);

function updateClientCount() {
    wss.clients.forEach(client => client.send(JSON.stringify({ clientCount: wss.clients.size })));
}
