require('src/rounded.less');
require('./style.less');

import Grid from 'src/grid';

const CELL_HEIGHT = 30;
const CELL_WIDTH = 30;

const connectionsDisplay = document.getElementById('noOfConnections');

var grid = document.getElementById('grid');

const userID = Math.random();

window.grid = new Grid(grid, {
    data: { height: CELL_HEIGHT, width: CELL_WIDTH },
});

const connection = new WebSocket('ws://localhost:8080');

connection.onopen = e => {
    console.log('hello, we did connect.', e);

    connection.send(JSON.stringify({ userID: userID }));
};

connection.onmessage = e => {
    console.log('I got a message!', e);
    const messateData = JSON.parse(e.data);

    if (messateData.clientCount) {
        connectionsDisplay.innerText = messateData.clientCount;
    }
};
