import Grid from 'grid';

require("./style.less");

let characters = require('./characters.js').getCharacters();

let grid = new Grid(document.getElementById('Grid-1'));
