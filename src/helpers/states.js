import settings from '../utils/settings.js';

/**
 * Object managing different states.
 *
 * @module states
 *
 * @property {function} loading - Function handling loading state operations.
 * @property {function} loaded - Function handling loaded state operations.
 * @property {function} error - Function handling error state operations.
 */
const states = {
  waiting: (element) => {
    element.setAttribute(settings.stateAttr, settings.states.waiting);
  },

  loading: (element, options) => {
    const handleLoad = () => {
      states.loaded(element, options);
    };
    const handleError = () => {
      states.error(element, options, 'loading media.');
    };

    element.addEventListener('load', handleLoad, { once: true });
    element.addEventListener('error', handleError, { once: true });

    element.setAttribute(settings.stateAttr, settings.states.loading);
    options.onLoading(element);
  },

  loaded: (element, options) => {
    element.setAttribute(settings.stateAttr, settings.states.loaded);

    element.removeAttribute(options.attrs.src);
    element.removeAttribute(options.attrs.srcset);
    element.removeAttribute(options.attrs.poster);

    options.onLoaded(element);
  },

  error: (element, options, error) => {
    element.setAttribute(settings.stateAttr, settings.states.error);

    options.onError(element, error);
  },
};

export default states;
