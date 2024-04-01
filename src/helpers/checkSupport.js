import settings from '../utils/settings.js';

/**
 * Checks if the given HTML element is of a supported type.
 *
 * @module checkSupport
 *
 * @param {HTMLElement} element - The HTML element to be checked.
 * @throws {Error} Throws an error if the element type is not supported.
 * @returns {boolean} Returns true if the element type is supported.
 */
export default (element) => {
  const elementType = element.tagName.toLowerCase();
  const isSupported = settings.supportedElements.includes(elementType);

  if (isSupported) throw new Error(`${elementType} Element is not supported!`);
  return true;
};
