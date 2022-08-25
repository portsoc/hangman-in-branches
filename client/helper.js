/**
 * Remove all elements that match the given selector.
 * @param selector - A string that specifies the CSS selector of the elements to remove
 */
export function safeRemove(selector) {
  const elements = document.querySelectorAll(selector);

  for (const element of elements) {
    element.remove();
  }
}

/**
 * It creates an element of the given type, sets the attributes and text content (if
 * provided), and appends the element to the parent element (if provided).
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
 * Draws the keyboard on the screen by creating a button for each letter.
 * @param parent - The parent element to append the keyboard to
 * @returns The keyboard element
 */
export function drawKeyboard(parent) {
  // separate the letters into 3 rows similar to a QWERTY keyboard
  const alphabet = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  const keyboard = create('section', parent, { id: 'keyboard' });

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

  return keyboard;
}
