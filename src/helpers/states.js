import settings from '../utils/settings.js';

/**
 * Object managing different states.
 *
 * @module states
 *
 * @property {function} setWaitingState - Function handling waiting state operations.
 * @property {function} setLoadingState - Function handling loading state operations.
 * @property {function} setLoadedState - Function handling loaded state operations.
 * @property {function} setErrorState - Function handling error state operations.
 */
export default {
  setWaiting: (element) => {
    element.setAttribute(settings.stateAttr, settings.states.waiting);
  },

  setLoading: (element, options) => {
    element.setAttribute(settings.stateAttr, settings.states.loading);
    options.onLoading(element);
  },

  setLoaded: (element, options) => {
    const assetAttr = Object.entries(options.attrs);

    element.setAttribute(settings.stateAttr, settings.states.loaded);
    assetAttr.forEach(([attr, lazyAttr]) => element.removeAttribute(lazyAttr));
    options.onLoaded(element);
  },

  setError: (element, options, error) => {
    element.setAttribute(settings.stateAttr, settings.states.error);
    options.onError(element, error);
  },
};
