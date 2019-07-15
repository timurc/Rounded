require('src/rounded.less');
require('./style.less');

import Grid from 'src/grid';

const CELL_HEIGHT = 40;
const CELL_WIDTH = 40;

var grid = document.getElementById('grid');

window.grid = new Grid(grid, {
    data: getGridSize({ el: grid, cellHeight: CELL_HEIGHT, cellWidth: CELL_WIDTH }),
});

function getGridSize({ el, cellHeight, cellWidth }) {
    return { height: Math.round(el.offsetHeight / cellHeight), width: Math.round(el.offsetWidth / cellWidth) };
}
