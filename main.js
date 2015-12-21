'use strict';

require('./rounded.js');
require("./style.less");

let characters = require('./characters.js').getCharacters();
let roundedGrid = require('./grid.js');

document.addEventListener("DOMContentLoaded", function(event) { 
	let grid = new roundedGrid.grid(document.getElementById('Grid-1'), 50, 50, true);
});