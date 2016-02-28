import Grid from 'src/grid';
import Type from 'src/type';

require("src/rounded.less");
require("examples/style.less");

const headings = document.querySelectorAll('h2');

for (let i = 0; i < headings.length; i++) {
	new Type(headings[i], headings[i].innerText, 100, true);
}