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
	constructor(rootElement, width, height, isEditable) {
		this.gridArray = [];
		this.width = width;
		this.height = height;
		this.isEditable = isEditable;

		rootElement.classList.add(CLASS_NAME);

		for (let rowIndex = 0; rowIndex < width; rowIndex++) {
			if (!this.gridArray[rowIndex]) {
				this.gridArray[rowIndex] = [];
			};

			let rowElement = this._addElement(rootElement, CLASS_NAME + '_row');

			for (let columnIndex = 0; columnIndex < height; columnIndex++) {
				let cell = new Cell(0, this.isEditable);
				rowElement.appendChild(cell.el);
				this._addNavigationHandlers(cell.el, rowIndex, columnIndex);
				this.gridArray[rowIndex].push(cell);
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

	_addNavigationHandlers(el, rowIndex, columnIndex) {
		el.addEventListener('keydown', (event) => {
			let step = event.altKey ? 10 : 1;
			let goToEnd = event.metaKey;
			switch (event.keyIdentifier) {
				case 'Up':
					if (goToEnd || rowIndex - step < 0) {
						this.gridArray[0][columnIndex].el.focus();
					} else {
						this.gridArray[rowIndex - step][columnIndex].el.focus();
					}
					event.preventDefault();
					break;
				case 'Down':
					if (goToEnd || rowIndex + step >= this.gridArray.length) {
						this.gridArray[this.gridArray.length - 1][columnIndex].el.focus();
					} else {
						this.gridArray[rowIndex + step][columnIndex].el.focus();
					}
					event.preventDefault();
					break;
				case 'Right':
					if (goToEnd || columnIndex + step >= this.gridArray[rowIndex].length) {
						this.gridArray[rowIndex][this.gridArray[rowIndex].length - 1].el.focus();
					} else {
						this.gridArray[rowIndex][columnIndex + step].el.focus();
					}
					event.preventDefault();
					break;
				case 'Left':
					if (goToEnd || columnIndex - step < 0) {
						this.gridArray[rowIndex][0].el.focus();
					} else {
						this.gridArray[rowIndex][columnIndex - step].el.focus();
					}
					event.preventDefault();
			}
		});
	}
}

class Cell {
	constructor(state, isEditable) {
		this.el = document.createElement('div');

		if (isEditable) {
			this.el.tabIndex = 1;
			this._addEventHandlers();
		}

		this.state = state;
	}

	set state(state) {
		// prevent setting states (DOM access) if not necessary 
		if (state === this._state) {
			return;
		}

		this._state = state;
		this._setElementState();
	}

	get state() {
		return this._state;
	}

	_addEventHandlers() {
		this.el.addEventListener('keypress', (event) => {
			if (event.charCode >= 48 && event.charCode <= 57) {
				this.state = event.charCode - 48;
			}
		});
	}

	_setElementState() {
		this.el.className = `${CLASS_NAME}_cell ${CLASS_NAME}_cell-${SHAPES[this.state]}`;
	}
}
