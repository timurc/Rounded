import Grid from 'src/grid';
import Type from 'src/type';

require("src/rounded.less");
require("src/rounded.less");
require("examples/print.less");

console.log('hello world!')

window.grid3 = new Grid(document.getElementById('printDisplay'), {
	data: { height: 40, width: 40}
});