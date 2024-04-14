/**
 * Default settings for the lazy loading functionality.
 *
 * @module settings
 *
 * @property {string} stateAttr - The attribute to store the state of the lazy loading process.
 * @property {Array} supportedElements - The types of elements that are supported for lazy loading.
 * @property {Object} states - The possible states of the lazy loading process.
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
