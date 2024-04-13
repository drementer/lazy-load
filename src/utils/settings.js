/**
 * Default settings for the lazy loading functionality.
 *
 * @module settings
 *
 * @property {string} stateAttr - The attribute to store the state of the lazy loading process.
 * @property {Object} states - The possible states of the lazy loading process.
 * @property {string} states.waiting - The state when the element is waiting to be loaded.
 * @property {string} states.loading - The state when the element is currently loading.
 * @property {string} states.loaded - The state when the element has finished loading.
 * @property {string} states.error - The state when there was an error loading the element.
 * @property {Array.<string>} supportedElements - The types of elements that are supported for lazy loading.
 */
export default {
  stateAttr: 'lazy-state',
  supportedElements: ['img', 'video', 'embed', 'object', 'iframe', 'audio'],
  states: {
    waiting: 'waiting',
    loading: 'loading',
    loaded: 'loaded',
    error: 'error',
  },
};
