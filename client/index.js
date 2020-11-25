require('src/rounded.less');
require('./style.less');

import Grid from 'src/grid';
const gridEl = document.getElementById('grid');
let grid;

const connectionsDisplay = document.getElementById('noOfConnections');

const userID = Math.random();

const server =
    process.env.NODE_ENV === 'development' ? 'ws://192.168.178.20:45300' : 'wss://rounded.volligohne.de:45300';

const connection = new WebSocket(server);

connection.onopen = (e) => {
    connection.send(JSON.stringify({ userID: userID }));
};

connection.onmessage = (e) => {
    const messateData = JSON.parse(e.data);

    if (messateData.clientCount) {
        connectionsDisplay.innerText = messateData.clientCount;
    }

    if (messateData.canvas) {
        if (grid) {
            grid.data = messateData.canvas;
        } else {
            grid = new Grid(gridEl, {
                data: messateData.canvas,
                updated: updated,
                mainColor: messateData.colorIndex,
            });
        }
    }
};

function updated(data) {
    if (connection.readyState === 1) {
        connection.send(JSON.stringify({ type: 'cellUpdate', data: data }));
    }
}
