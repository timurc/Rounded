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

		CHARACTERS.forEach((character, charCode) => {
			if (character, charCode) {
				const character = this._generateCharacterContainer(character, charCode);
				this._list.appendChild(character);
			}
		});
	}



	_generateCharacterContainer (character, charCode) {
		const title = ((charCode === 32) ? '(space)' : String.fromCharCode(charCode));
		const container = document.createElement('li');
		container.classList.add('type-edit-list-item');

		const template = `
			<div class="type-edit-char_code">${charCode}</div>
			<h3>${title}</h3>`

		container.innerHTML = template;

		new Type(container, String.fromCharCode(charCode), 100, true);

		return container;
	}
}