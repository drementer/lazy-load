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
const states = {
  setWaiting: (element) => {
    element.setAttribute(settings.stateAttr, settings.states.waiting);
  },

  setLoading: (element, options) => {
    const handleLoad = () => {
      states.setLoaded(element, options);
    };
    const handleError = () => {
      states.setError(element, options, 'loading media.');
    };

    element.addEventListener('load', handleLoad, { once: true });
    element.addEventListener('error', handleError, { once: true });

    element.setAttribute(settings.stateAttr, settings.states.loading);
    options.onLoading(element);
  },

  setLoaded: (element, options) => {
    element.setAttribute(settings.stateAttr, settings.states.loaded);

    element.removeAttribute(options.attrs.src);
    element.removeAttribute(options.attrs.srcset);
    element.removeAttribute(options.attrs.poster);

    options.onLoaded(element);
  },

  setError: (element, options, error) => {
    element.setAttribute(settings.stateAttr, settings.states.error);

    options.onError(element, error);
  },
};

export default states;
