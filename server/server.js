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

const GRID_WIDTH = 30;
const GRID_HEIGHT = 30;

const canvas = generateDataArray(GRID_WIDTH, GRID_HEIGHT);

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
    ws.id = req.headers['sec-websocket-key'];
    console.log('connected 🎉', ws.id);

    ws.on('message', function incoming(message) {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'cellUpdate') {
            updateCanvas(parsedMessage.data);
        }
    });

    ws.on('close', function incoming(message) {
        console.log('closed :-/');
        updateClientCount();
    });
    updateClientCount();

    ws.send(JSON.stringify({ canvas: canvas }));
});

function updateClientCount() {
    sendMessageToAllClients({ clientCount: wss.clients.size });
}

function sendMessageToAllClients(message) {
    wss.clients.forEach(client => client.send(JSON.stringify(message)));
}

function updateCanvas(data) {
    canvas[data.rowIndex][data.columnIndex] = data.state;
    sendMessageToAllClients({ canvas: canvas });
}

function generateDataArray(width, height) {
    const dataArray = [];

    for (let i = 0; i < height; i++) {
        dataArray.push([]);

        for (let k = 0; k < width; k++) {
            dataArray[dataArray.length - 1].push(0);
        }
    }

    return dataArray;
}
