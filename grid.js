'use strict';

const CLASS_NAME = 'rounded-grid';

const SHAPES = [
	'blank',
	'square',
	'tr',
	'br',
	'bl',
	'tl',
	'circle', 
	'rotated'
];

exports.grid = class Grid {
	constructor(rootElement, width, height) {
		this.gridArray = [];
		this.width = width;
		this.height = height;

		rootElement.classList.add(CLASS_NAME);

		for (let rowIndex = 0; rowIndex < width; rowIndex++) {
			if (!this.gridArray[rowIndex]) {
				this.gridArray[rowIndex] = [];
			};

			let rowElement = this._addElement(rootElement, CLASS_NAME + '_row');

			for (let columnIndex = 0; columnIndex < height; columnIndex++) {
				let columnElement = this._addElement(rowElement);
				this._setCell(columnElement, 0);
				this._addCellAttributes(columnElement);
				this.gridArray[rowIndex].push(columnElement)
			}
		}
	}

	_addElement(rootElement, className) {
		let element = document.createElement('div');
		if (className) {
			element.classList.add(className);
		}
		rootElement.appendChild(element);
		return element;
	}

	_setCell(cell, state) {
		if (cell.dataset.roundedGridState === state) {
			return;
		}

		cell.className = this._generateStateClassName(state);
		cell.dataset.roundedGridState = state;
	}

	_addCellAttributes(cell) {
		cell.tabIndex = 1;
		cell.addEventListener('keypress', (event) => {
			if (event.charCode >= 48 && event.charCode <= 57) {
				this._setCell(cell, event.charCode - 48);
			}
		});
	}

	_generateStateClassName(state) {
		return CLASS_NAME + '_cell ' + CLASS_NAME + '_cell-' + SHAPES[state];
	}
}
