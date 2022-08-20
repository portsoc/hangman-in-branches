/**
 * Takes the size of an array and returns a random index between 0 and size.
 * The number itself is not included in the range.
 * @param size - The size of the array.
 * @returns A random index from the array.
 */
function randomIndex(size) {
  const index = Math.floor(Math.random() * size);
  return index;
}

/**
 * Return a random element from the given array.
 * @param array - The array to choose a random element from.
 * @returns A random element from the array.
 */
export function randomElement(array) {
  const size = array.length;
  const index = randomIndex(size);
  const element = array[index];
  return element;
}
