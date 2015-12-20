'use strict';

const CLASS_NAME = 'rounded-grid';

exports.grid = class Grid {
	constructor(rootElement, width, height) {
		this.gridArray = [];
		this.width = width;
		this.height = height;

		rootElement.classList.add(CLASS_NAME);

		for (var rowIndex = 0; rowIndex < width; rowIndex++) {
			if (!this.gridArray[rowIndex]) {
				this.gridArray[rowIndex] = [];
			};

			let rowElement = _addElement(rootElement, CLASS_NAME + '_row');

			for (let columnIndex = 0; columnIndex < height; columnIndex++) {
				let columnElement = _addElement(rowElement, CLASS_NAME + '_cell');
				this.gridArray[rowIndex].push(columnElement)
			}
		}

		function _addElement(rootElement, className) {
			let element = document.createElement('div');
			element.classList.add(className);
			rootElement.appendChild(element);
			return element;
		};
	}
}