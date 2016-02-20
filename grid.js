
const DEFAULTS = {
	CLASS_NAME: 'rounded-grid',
	SHAPES: [
		'blank',
		'square',
		'tr',
		'br',
		'bl',
		'tl',
		'circle', 
		'rotated'
	],
	KEYMAP: {
		e: 'tr',
		w: 'tl',
		s: 'bl',
		d: 'br',
		q: 'circle',
		a: 'square',
		r: 'blank'
	}, 
	isEditable: true,
	data: [
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0]
	]
};

export default class Grid {
	constructor(rootElement, config) {
		this.config = Object.assign({}, DEFAULTS, config);

		this._rootElement = rootElement;
		this._rootElement.classList.add(this.config.CLASS_NAME);

		this.data = this.config.data;

		this._addNavigationHandlers();
	}

	set data(data) {
		if (!this.gridArray) {
			this._initGrid();
		} else {
			this.gridArray.forEach((row, rowIndex) => {
				row.forEach((cell, columnIndex) => {
					cell.state = data[rowIndex][columnIndex];
				})
			})
		}
	}

	get data() {
		const dataExport = [];

		this.gridArray.forEach((row, rowIndex) => {
			dataExport.push([]);

			row.forEach((cell, columnIndex) => {
				dataExport[rowIndex].push(cell.state);
			})
		})

		return dataExport;
	}

	_initGrid() {
		this.gridArray = [];

		this.config.data.forEach((rowData) => {
			this.gridArray.push([]);
			const rowElement = this._addElement(this._rootElement, this.config.CLASS_NAME + '_row');

			rowData.forEach((cellData) => {
				const cell = new Cell(cellData, this.config.isEditable, this.config);
				rowElement.appendChild(cell.el);
				this.gridArray[this.gridArray.length - 1].push(cell);
			});
		});
	}

	_addElement(rootElement, className) {
		const element = document.createElement('div');

		if (className) {
			element.classList.add(className);
		}
		rootElement.appendChild(element);
		return element;
	}

	_addNavigationHandlers() {
		this.gridArray.forEach((row, rowIndex) => {
			row.forEach((cell, columnIndex) => {
				this._addNavigationHandlersToElement(cell.el, rowIndex, columnIndex);
			});
		})
	}

	_addNavigationHandlersToElement(el, rowIndex, columnIndex) {
		el.addEventListener('keydown', (event) => {
			const step = event.altKey ? 10 : 1;
			const goToEnd = event.metaKey;

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
	constructor(state, isEditable, config) {
		this.el = document.createElement('div');
		this.config = config;

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
		this.el.addEventListener('keydown', (event) => {
			const keyPressed = String.fromCharCode(event.keyCode || event.which).toLowerCase();
			const state = this.config.KEYMAP[keyPressed] && this.config.SHAPES.indexOf(this.config.KEYMAP[keyPressed]);
			if (state >= 0) {
				this.state = state;
			}
		});
	}

	_setElementState() {
		this.el.className = `${this.config.CLASS_NAME}_cell ${this.config.CLASS_NAME}_cell-${this.config.SHAPES[this.state]}`;
	}
}

