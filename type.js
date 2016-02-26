import Grid from 'grid';
import CHARACTERS from 'characters';
const characterHeight = 4;

export default class Type {
	constructor(rootElement, string, delay, separateWords) {
		rootElement.classList.add('type');
		if (separateWords) {
			const words = string.split(' ');
			let letterPosition = 0;

			words.forEach((word) => {
				const wordWrapper = document.createElement('span');
				rootElement.appendChild(wordWrapper);
				wordWrapper.classList.add('type-word');

				for (let letter of word) {
					const letterWrapper = document.createElement('span');
					wordWrapper.appendChild(letterWrapper);
					letterWrapper.classList.add('type-letter');
					letterPosition++;

					const grid = new Grid(letterWrapper, {
						data: {
							height: characterHeight,
							width: this._getLength(letter)
						}
					});

					setTimeout(() => {
						grid.typeString(letter, 0, 0);
					}, delay * letterPosition);
				}
			});
		} else {
			this._grid = new Grid(rootElement, {
				data: {
					height: characterHeight,
					width: this._getLength(string)
				}
			});

			this._grid.typeString(string, 0, 0, delay);			
		}
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