/**
 * Removes all elements that match `selector`
 * @param selector - A string that specifies the CSS selector of the elements to remove
 */
export function safeRemove(selector) {
  const elements = document.querySelectorAll(selector);

  for (const element of elements) {
    element.remove();
  }
}

/**
 * Creates an element of given `type`, sets `attributes` and `text`
 * and appends the element to `parent`.
 * @param type - the type of the element to be created, e.g. div, p, h1, etc.
 * @param parent - the parent element to append the new element to
 * @param [attributes] - a map of attributes to be set on the element
 * @param text - the text to be displayed in the element
 * @returns The element that was created
 */
export function create(type, parent, attributes = {}, text) {
  const element = document.createElement(type);

  for (const propertyName of Object.keys(attributes)) {
    element[propertyName] = attributes[propertyName];
  }

  if (text) {
    element.textContent = text;
  }

  parent?.append(element);

  return element;
}

/**
 * Draws the keys on the keyboard
 * @param keyboard - The keyboard element to append the keys to
 */
export function drawKeyboard(keyboard) {
  const alphabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  for (const row of alphabet) {
    const letterRow = create('div', keyboard, { id: 'keys_' + row });
    letterRow.classList.add('letterRow');

    for (const letter of row) {
      const btn = create('button', letterRow, {
        id: 'key_' + letter,
        textContent: letter
      }, letter);
      btn.dataset.letter = letter;
    }
  }
}
