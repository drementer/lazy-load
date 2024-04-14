/**
 * Select elements based on a given selector within a specified root element.
 *
 * @module getElements
 *
 * @param {string | Element | NodeList | Array} selector - The selector to match elements.
 * @returns {NodeList} - The NodeList containing the selected elements.
 */
export default (selector) => {
  if (selector instanceof Element) return [selector];
  if (selector instanceof NodeList) return selector;
  if (selector instanceof Array) return selector;

  const elements = document.querySelectorAll(selector);

  if (!elements.length) throw new Error('No lazy loadable element found!');
  return elements;
};
