import Grid from 'src/grid';
import Type from 'src/type';

require("src/rounded.less");
require("examples/style.less");

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

window.grid4 = new Type({
	el: document.getElementById('Grid-4'), 
	text: 'nice to meet you!', 
	delay: 20 
});

const headings = document.querySelectorAll('h2');

for (let i = 0; i < headings.length; i++) {
	new Type({
		el: headings[i], 
		text: headings[i].innerText,
		delay: 100
	});
}