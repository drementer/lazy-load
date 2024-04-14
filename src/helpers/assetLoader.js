/**
 * Set attributes on the given HTML element based on the provided options.
 *
 * @module assetLoader
 *
 * @param {HTMLElement} element - The HTML element to set attributes on.
 * @param {Object} options - Options for attribute names.
 */
export default (element, options) => {
  const attributes = Object.entries(options.attrs);

  const loadAttr = ([attr, lazyAttr]) => {
    const assetPath = element.getAttribute(lazyAttr);
    if (assetPath) element.setAttribute(attr, assetPath);
  };

  attributes.forEach(loadAttr);
};
