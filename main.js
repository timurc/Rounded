import Grid from 'grid';

require("./rounded.less");
require("./style.less");

let characters = require('./characters.js').getCharacters();

window.grid = new Grid(document.getElementById('Grid-1'));

window.grid2 = new Grid(document.getElementById('Grid-2'), {
	data: [
		[1,1,3,0,0,0,0,6,0,5],
		[1,3,0,0,0,0,6,0,5,3],
		[3,0,0,0,0,6,0,5,3,0],
		[0,0,0,0,6,0,5,3,0,6],
		[0,0,0,6,0,5,3,0,6,0],
		[0,0,6,0,5,3,0,6,0,0],
		[0,6,0,5,3,0,6,0,0,0],
		[6,0,5,3,0,6,0,0,0,5],
		[0,5,3,0,6,0,0,0,5,1],
		[5,3,0,6,0,0,0,5,1,1]
	]
});
