import Grid from 'grid';
import Type from 'type';

require("./rounded.less");
require("./style.less");

window.grid = new Grid(document.getElementById('Grid-1'));

window.grid2 = new Grid(document.getElementById('Grid-2'), {
	data: [
		[1,1,3,0,0,0,6,0,5,3],
		[1,3,0,0,0,6,0,5,3,0],
		[3,0,0,0,6,0,5,3,0,6],
		[0,0,0,6,0,5,3,0,6,0],
		[0,0,6,0,5,3,0,6,0,0],
		[0,6,0,5,3,0,6,0,0,0],
		[6,0,5,3,0,6,0,0,0,5],
		[0,5,3,0,6,0,0,0,5,1],
		[5,3,0,6,0,0,0,5,1,1]
	]
});

document.getElementById('export').addEventListener('click', () => {
	document.getElementById('textarea').value = JSON.stringify(window.grid2.data);
});

document.getElementById('import').addEventListener('click', () => {
	window.grid2.data = JSON.parse(document.getElementById('textarea').value);
});

window.grid3 = new Grid(document.getElementById('Grid-3'), {
	data: { height: 40, width: 40}
});

window.grid4 = new Type(document.getElementById('Grid-4'), 'nice to meet you!', true);

const headings = document.querySelectorAll('h2');

for (let i = 0; i < headings.length; i++) {
	new Type(headings[i], headings[i].innerText, true);
}