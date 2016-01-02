import Grid from 'grid';

require("./style.less");

let characters = require('./characters.js').getCharacters();

document.addEventListener("DOMContentLoaded", function(event) { 
	let grid = new Grid(document.getElementById('Grid-1'), 50, 50, true);
});