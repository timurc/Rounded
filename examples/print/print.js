import Grid from 'src/grid';
import Type from 'src/type';

require('src/rounded.less');
require('./print.less');

var printDisplay = document.getElementById('printDisplay');

window.grid = new Grid(printDisplay, {
    data: { height: 28, width: 28 },
});

printDisplay.querySelector('.rounded-grid_cell').focus();

window.addEventListener('keydown', event => {
    if (event.code === 'Backspace') {
        event.preventDefault();
    }

    if (event.code === 'F13') {
        window.print();

        printDisplay.innerHTML = '';

        window.grid = new Grid(printDisplay, {
            data: { height: 28, width: 28 },
        });

        printDisplay.querySelector('.rounded-grid_cell').focus();
    }
});
