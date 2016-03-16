import Grid from 'src/grid';
import Type from 'src/type';
import CHARACTERS from 'src/characters';
const characterHeight = 4;

export default class TypeEdit {
	constructor(el) {
		this._init(el);
	}

	_init (el) {
		this._list = document.createElement('ul');
		this._list.classList.add('type-edit-list');
		el.appendChild(this._list);

		CHARACTERS.forEach((character, index) => {
			console.log(character, index);
			if (character) {
				const container = document.createElement('li');
				const charCode = document.createElement('div');
				const heading = document.createElement('h3');

				container.classList.add('type-edit-list-item');
				charCode.classList.add('type-edit-char_code');

				charCode.innerText = index;
				heading.innerText = ((index === 32) ? '(space)' : String.fromCharCode(index))

				container.appendChild(charCode);
				container.appendChild(heading);
				new Type(container, String.fromCharCode(index), 100, true);
				this._list.appendChild(container);
			}
		});
	}
}