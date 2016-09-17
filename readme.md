# Rounded

This project started to be a system to generate simplistic typography inspired by Joseph Albers' *Kombinationsschrift*. It is just based on 3 shapes: 

  * circle
  * square
  * quarter of a square (in four orientations)

It will generate a matrix of DOM elements that render the according letters when given a string. This can easily be styled or animated with CSS in many ways.

## Usage

### Render Strings

To render a string we need a string and a DOM element where to place the output. The following example will render the `hello world` to the DOM node with the ID `grid`:

```javascript
var grid = new Type(document.getElementById('grid'), 'hello world');
```

In this example all h2 elements are beeing replaced by a *Rounded* text:

```javascript
const headings = document.querySelectorAll('h2');

for (let i = 0; i < headings.length; i++) {
	new Type(headings[i], headings[i].innerText, 100, true);
}
```
