import DEFAULTS from 'defaults';
import CHARACTERS from 'characters';

export default class Grid {
	constructor(rootElement, config) {
		this.config = Object.assign({}, DEFAULTS, config);

		this._rootElement = rootElement;
		this._rootElement.classList.add(this.config.CLASS_NAME);

		this.data = this.config.data;

		this._addEventHandlers();
	}

	set data(data) {
		if (!this._gridArray) {
			this._initGrid();
		} else {
			this._gridArray.forEach((row, rowIndex) => {
				row.forEach((cell, columnIndex) => {
					cell.state = data[rowIndex][columnIndex];
				})
			})
		}
	}

	get data() {
		const dataExport = [];

		this._gridArray.forEach((row, rowIndex) => {
			dataExport.push([]);

			row.forEach((cell, columnIndex) => {
				dataExport[rowIndex].push(cell.state);
			})
		})

		return dataExport;
	}

	_initGrid() {
		this._gridArray = [];
		let newGridArray;
		
		if (Array.isArray(this.config.data)) {
			newGridArray = this.config.data;
		} else {
			newGridArray = this._generateDataArray(this.config.data.width, this.config.data.height);
		}

		newGridArray.forEach((rowData) => {
			this._gridArray.push([]);
			const rowElement = this._addElement(this._rootElement, this.config.CLASS_NAME + '_row');

			rowData.forEach((cellData) => {
				const cell = new Cell(cellData, this.config.isEditable, this.config);
				rowElement.appendChild(cell.el);
				this._gridArray[this._gridArray.length - 1].push(cell);
			});
		});
	}

	_generateDataArray(width, height) {
		const dataArray = [];

		for (let i = 0; i < height; i++) {
			dataArray.push([]);

			for (let k = 0; k < width; k++) {
				dataArray[dataArray.length - 1].push(0);
			}
		}

		return dataArray;
	}

	_addElement(rootElement, className) {
		const element = document.createElement('div');

		if (className) {
			element.classList.add(className);
		}
		rootElement.appendChild(element);
		return element;
	}

	_addEventHandlers() {
		this._gridArray.forEach((row, rowIndex) => {
			row.forEach((cell, columnIndex) => {
				this._addNavigationHandlersToElement(cell.el, rowIndex, columnIndex);
				this._addTypeHandlersToElement(cell.el, rowIndex, columnIndex);
			});
		})
	}

	_addTypeHandlersToElement(el, rowIndex, columnIndex) {
		el.addEventListener('keypress', (event) => {
			event.preventDefault();
			const keyPressed = event.keyCode || event.which;
			const step = this._getCharacterWidth(keyPressed);

			const hasTyped = this.typeCharacter(keyPressed, rowIndex, columnIndex);			

			if (hasTyped) {
				if (columnIndex + step >= this._gridArray[rowIndex].length) {
					this._gridArray[rowIndex][this._gridArray[rowIndex].length - 1].el.focus();
				} else {
					this._gridArray[rowIndex][columnIndex + step].el.focus();
				}	
			}
		});
	}

	typeCharacter (character, rowIndex, columnIndex) {
		if (CHARACTERS[character]) {
			const char = CHARACTERS[character];

			char.forEach((charRow, charRowIndex) => {
				const row = this._gridArray[rowIndex + charRowIndex];

				if (row) {
					charRow.forEach((charCell, charCellIndex) => {
						const cell = row[charCellIndex + columnIndex];
						
						if (cell) {
							cell.state = charCell;
						}
					});
				}
			});

			return true;
		}
	}

	typeString (string, rowIndex, columnIndex, delay) {
		let currentPosition = 0;

		for (let letter of string)  {
			const charCode = letter.charCodeAt(0);
			const typePosition = currentPosition + columnIndex;
			currentPosition += this._getCharacterWidth(charCode);
			
			(function(currentPosition, grid) {
				setTimeout(() => {
					grid.typeCharacter(charCode, rowIndex, currentPosition);
				}, delay * currentPosition);
			})(typePosition, this)
		};
	}

	_getCharacterWidth (charCode) {
		return CHARACTERS[charCode] && CHARACTERS[charCode][0].length;
	}

	_addNavigationHandlersToElement(el, rowIndex, columnIndex) {
		el.addEventListener('keydown', (event) => {
			const step = event.altKey ? 10 : 1;
			const goToEnd = event.metaKey;

			switch (event.keyIdentifier) {
				case 'Up':
					if (goToEnd || rowIndex - step < 0) {
						this._gridArray[0][columnIndex].el.focus();
					} else {
						this._gridArray[rowIndex - step][columnIndex].el.focus();
					}
					event.preventDefault();
					break;
				case 'Down':
					if (goToEnd || rowIndex + step >= this._gridArray.length) {
						this._gridArray[this._gridArray.length - 1][columnIndex].el.focus();
					} else {
						this._gridArray[rowIndex + step][columnIndex].el.focus();
					}
					event.preventDefault();
					break;
				case 'Right':
					if (goToEnd || columnIndex + step >= this._gridArray[rowIndex].length) {
						this._gridArray[rowIndex][this._gridArray[rowIndex].length - 1].el.focus();
					} else {
						this._gridArray[rowIndex][columnIndex + step].el.focus();
					}
					event.preventDefault();
					break;
				case 'Left':
					if (goToEnd || columnIndex - step < 0) {
						this._gridArray[rowIndex][0].el.focus();
					} else {
						this._gridArray[rowIndex][columnIndex - step].el.focus();
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

