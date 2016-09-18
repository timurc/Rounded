import Grid from 'src/grid';
import CHARACTERS from 'src/characters';
const characterHeight = 4;

export default class Type {
	constructor({ el, text, delay = 100, separateWords = true }) {

		el.classList.add('type');
		if (separateWords) {
			const words = text.split(' ');
			let letterPosition = 0;

			words.forEach((word) => {
				const wordWrapper = document.createElement('span');
				el.appendChild(wordWrapper);
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
			this._grid = new Grid(el, {
				data: {
					height: characterHeight,
					width: this._getLength(text)
				}
			});

			this._grid.typeString(text, 0, 0, delay);			
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