import Grid from 'src/grid';
import Type from 'src/type';
import TypeEdit from 'src/type-edit';

require("src/rounded.less");
require("examples/style.less");

const headings = document.querySelectorAll('h2');

for (let i = 0; i < headings.length; i++) {
	new Type(headings[i], headings[i].innerText, 100, true);
}

const typeEditList = document.getElementById('typeList');

const typeEdit = new TypeEdit(typeEditList);