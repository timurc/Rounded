import Grid from 'grid';
import CHARACTERS from 'characters';
const characterHeight = 4;

export default class Type {
	constructor(rootElement, string, config) {
		this._grid = new Grid(rootElement, {
			data: {
				height: characterHeight,
				width: this._getLength(string)
			}
		})

		this._grid.typeString(string, 0, 0, 50);
	}

	_getLength(string) {
		let length = 0;
		for (let letter of string) {
			const charCode = letter.charCodeAt(0);

			if (CHARACTERS[charCode]) {
				length += CHARACTERS[charCode][0].length;
			}
		}
		return length;
	}
};