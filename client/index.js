require('src/rounded.less');
require('./style.less');

import Grid from 'src/grid';
const gridEl = document.getElementById('grid');
let grid;

const connectionsDisplay = document.getElementById('noOfConnections');

const userID = Math.random();

const connection = new WebSocket('ws://localhost:8080');

connection.onopen = e => {
    connection.send(JSON.stringify({ userID: userID }));
};

connection.onmessage = e => {
    const messateData = JSON.parse(e.data);
    console.log('received');

    if (messateData.clientCount) {
        connectionsDisplay.innerText = messateData.clientCount;
    }

    if (messateData.canvas) {
        console.log('got some grid');
        if (grid) {
            console.log('updating');
            grid.data = messateData.canvas;
        } else {
            console.log('initializing');
            grid = new Grid(gridEl, {
                data: messateData.canvas,
                updated: updated,
            });
            console.log(grid);
        }
    }
};

function updated(data) {
    if (connection.readyState === 1) {
        connection.send(JSON.stringify({ type: 'cellUpdate', data: data }));
    }
}
