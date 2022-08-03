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
 * It creates an element of the type provided, sets the attributes and text content if
 * provided, and appends the element to the parent element if provided
 * @param type - the type of the element to be created, e.g. div, p, h1, etc.
 * @param parent - the parent element to append the new element to
 * @param [attributes] - a map of attributes to be set on the element
 * @param text - the text to be displayed in the element
 * @returns The element that was created
 */
export function create(type, parent, attributes = {}, text) {
  const element = document.createElement(type);
  // for every property name (key in the map of attributes)
  for (const propertyName of Object.keys(attributes)) {
    // set the attribute of the element to the value of the property in the attributes map
    element[propertyName] = attributes[propertyName];
  }
  // if the text parameter is provided, set the textContent of the element to the text parameter
  if (text) {
    element.textContent = text;
  }
  // append the element to the parent element if exists
  parent?.append(element);
  // return the element in case it is needed to be used further
  return element;
}

/**
 * Draws the keyboard on the screen by creating a button for each letter
 * @param parent - The parent element to append the keyboard to.
 * @returns The keyboard element
 */
export function drawKeyboard(parent) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const keyboard = create('section', parent, { id: 'keyboard' });

  for (const letter of alphabet) {
    const button = create('button', keyboard, {}, letter);
    button.dataset.letter = letter;
  }
  return keyboard;
}
